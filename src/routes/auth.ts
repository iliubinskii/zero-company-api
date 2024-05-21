import {
  ADMIN_EMAIL,
  AUTH0_RETURN_URL,
  COOKIE_DOMAIN,
  JWT_SECRET
} from "../config";
import {
  AUTH0_SCOPE,
  AUTH_COOKIE_EXPIRATION_LIFETIME_MS,
  AUTH_COOKIE_LIFETIME_MS,
  AUTH_COOKIE_NAME,
  JWT_EXPIRES_IN
} from "../consts";
import type { Jwt, RoutesOld } from "../schema";
import {
  filterUndefinedProperties,
  sendResponseOld,
  wrapAsyncHandler
} from "../utils";
import { JwtValidationSchema } from "../schema";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import type { UsersService } from "../types";
import jwt from "jsonwebtoken";
import { lang } from "../langs";
import { logger } from "../services";
import passport from "passport";
import zod from "zod";

/**
 * Create the authentication router.
 * @param usersService - The users service.
 * @returns Router
 */
export function createAuthRouter(usersService: UsersService): Router {
  const router = Router();

  router
    .get(
      "/callback",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Postponed
      passport.authenticate("auth0", {
        failureRedirect: AUTH0_RETURN_URL
      }),
      (req, res, next) => {
        if (req.isAuthenticated()) {
          const user = Auth0UserValidationSchema.parse(req.user);

          const token = jwt.sign({ email: user.emails[0].value }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
          });

          req.logout(err => {
            if (err) next(err);
            else
              res
                .cookie(AUTH_COOKIE_NAME, token, {
                  domain: COOKIE_DOMAIN,
                  expires: new Date(Date.now() + AUTH_COOKIE_LIFETIME_MS),
                  httpOnly: true,
                  path: "/",
                  sameSite: "strict",
                  secure: true
                })
                .redirect(AUTH0_RETURN_URL);
          });
        } else res.redirect(AUTH0_RETURN_URL);
      }
    )
    .get(
      "/login",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Postponed
      passport.authenticate("auth0", { scope: AUTH0_SCOPE }),
      (_req, res) => {
        res.redirect(AUTH0_RETURN_URL);
      }
    )
    .get("/logout", (_req, res) => {
      res
        .cookie(AUTH_COOKIE_NAME, "", {
          domain: COOKIE_DOMAIN,
          expires: new Date(Date.now() - AUTH_COOKIE_EXPIRATION_LIFETIME_MS),
          httpOnly: true,
          path: "/",
          sameSite: "strict",
          secure: true
        })
        .redirect(AUTH0_RETURN_URL);
    })
    .get(
      "/me",
      wrapAsyncHandler(async (req, res) => {
        const result = await new Promise<Jwt | undefined>(resolve => {
          const token = req.cookies[AUTH_COOKIE_NAME] as unknown;

          if (typeof token === "string")
            jwt.verify(token, JWT_SECRET, (jwtError, decoded) => {
              if (jwtError)
                logger.warn(lang.JwtVerificationFailed, jwtError, {
                  requestId: req.requestId
                });
              else {
                const parsed = JwtValidationSchema.safeParse(decoded);

                if (parsed.success) resolve(parsed.data);
                else
                  logger.warn(lang.JwtVerificationFailed, parsed.error, {
                    requestId: req.requestId
                  });
              }
            });

          resolve(undefined);
        });

        if (result) {
          const { email } = result;

          const user = await usersService.getUser(email);

          sendResponseOld<RoutesOld["/auth"]["/me"]["GET"]>(
            res,
            StatusCodes.OK,
            filterUndefinedProperties({
              admin: ADMIN_EMAIL.includes(email),
              email,
              user
            })
          );
        } else
          sendResponseOld<RoutesOld["/auth"]["/me"]["GET"]>(
            res,
            StatusCodes.OK,
            null
          );
      })
    );

  return router;
}

const Auth0UserValidationSchema = zod
  // Do not use strictObject: auth0 may return additional fields
  .object({
    emails: zod
      .array(zod.strictObject({ value: zod.string() }))
      .nonempty()
      .max(1)
  });
