import { ADMIN_EMAIL, JWT_SECRET } from "../config";
import {
  AUTH_COOKIE_NAME,
  AUTH_HEADER_NAME,
  AUTH_HEADER_PREFIX
} from "../consts";
import { ErrorCode } from "../schema";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { buildErrorResponse } from "../utils";
import jwt from "jsonwebtoken";
import { logger } from "../global-services";
import zod from "zod";

export const appendJwt: RequestHandler = (req, res, next) => {
  const token = getToken(req);

  if (typeof token === "string")
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        logger.error(err);
        res
          .status(StatusCodes.UNAUTHORIZED)
          .json(buildErrorResponse(ErrorCode.Unauthorized));
      } else {
        const email = JwtValidationSchema.parse(decoded).email.toLowerCase();

        req.authUser = {
          admin: ADMIN_EMAIL.includes(email),
          email
        };
        next();
      }
    });
  else next();
};

const JwtValidationSchema = zod.strictObject({
  email: zod.string().email()
});

/**
 * Get the token from the request.
 * @param req - The request.
 * @returns The token.
 */
function getToken(req: Parameters<RequestHandler>[0]) {
  // eslint-disable-next-line security/detect-object-injection -- Ok
  const authCookie = req.cookies[AUTH_COOKIE_NAME] as unknown;

  // eslint-disable-next-line security/detect-object-injection -- Ok
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
