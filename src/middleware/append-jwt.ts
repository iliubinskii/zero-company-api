import { ADMIN_EMAIL, JWT_SECRET } from "../config";
import {
  AUTH_COOKIE_NAME,
  AUTH_HEADER_NAME,
  AUTH_HEADER_PREFIX
} from "../consts";
import { JwtValidationSchema } from "../schema";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { lang } from "../langs";
import { logger } from "../services";
import zod from "zod";

export const appendJwt: RequestHandler = (req, _res, next) => {
  const token = getToken(req);

  if (typeof token === "string")
    jwt.verify(token, JWT_SECRET, (jwtError, decoded) => {
      if (jwtError)
        logger.warn(lang.JwtVerificationFailed, jwtError, {
          requestId: req.requestId
        });
      else
        try {
          const { email } = JwtValidationSchema.parse(decoded);

          req.jwtUser = {
            admin: ADMIN_EMAIL.includes(email),
            email
          };
        } catch (err) {
          if (err instanceof zod.ZodError)
            logger.warn(lang.JwtVerificationFailed, err, {
              requestId: req.requestId
            });
          else throw err;
        }
    });

  next();
};

/**
 * Get the token from the request.
 * @param req - The request.
 * @returns The token.
 */
function getToken(req: Parameters<RequestHandler>[0]): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Ok
  const authCookie = req.cookies[AUTH_COOKIE_NAME] as unknown;

  const authHeader = req.headers[AUTH_HEADER_NAME];

  // Do not allow to have both header and cookie
  if (typeof authHeader === "string" && typeof authCookie === "string")
    return "";

  if (
    typeof authHeader === "string" &&
    authHeader.startsWith(AUTH_HEADER_PREFIX)
  )
    return authHeader.slice(AUTH_HEADER_PREFIX.length);

  if (typeof authCookie === "string") return authCookie;

  return undefined;
}
