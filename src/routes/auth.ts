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
import type { AuthUserEssential, Jwt, RoutesOld } from "../schema";
import { JwtValidationSchema, preprocessEmail } from "../schema";
import {
  buildQuery,
  filterUndefinedProperties,
  sendResponseOld,
  wrapAsyncHandler
} from "../utils";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import type { UsersService } from "../types";
import type { Writable } from "ts-toolbelt/out/Object/Writable";
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
      wrapAsyncHandler(async (req, res) => {
        if (req.isAuthenticated()) {
          const auth0User = Auth0UserValidationSchema.parse(req.user);

          await new Promise<void>((resolve, reject) => {
            req.logout((err: unknown) => {
              // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- Ok
              if (err) reject(err);
              else resolve();
            });
          });

          const payload: Jwt = { email: auth0User.emails[0].value };

          const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
          });

          const userQueryParam: Writable<AuthUserEssential> = {
            admin: ADMIN_EMAIL.includes(payload.email),
            email: payload.email
          };

          const user = await usersService.getUser({
            email: payload.email,
            type: "email"
          });

          if (user)
            userQueryParam.user = {
              firstName: user.firstName,
              lastName: user.lastName
            };

          const queryStr = buildQuery({
            action: "login",
            user: JSON.stringify(userQueryParam)
          });

          res
            .cookie(AUTH_COOKIE_NAME, token, {
              domain: COOKIE_DOMAIN,
              expires: new Date(Date.now() + AUTH_COOKIE_LIFETIME_MS),
              httpOnly: true,
              path: "/",
              sameSite: "strict",
              secure: true
            })
            .redirect(`${AUTH0_RETURN_URL}${queryStr}`);
        } else res.redirect(AUTH0_RETURN_URL);
      })
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
      const queryStr = buildQuery({ action: "logout" });

      res
        .cookie(AUTH_COOKIE_NAME, "", {
          domain: COOKIE_DOMAIN,
          expires: new Date(Date.now() - AUTH_COOKIE_EXPIRATION_LIFETIME_MS),
          httpOnly: true,
          path: "/",
          sameSite: "strict",
          secure: true
        })
        .redirect(`${AUTH0_RETURN_URL}${queryStr}`);
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

          const user = await usersService.getUser({
            email,
            type: "email"
          });

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
      .array(zod.strictObject({ value: preprocessEmail(zod.string().email()) }))
      .nonempty()
      .max(1)
  });
