import {
  ADMIN_EMAIL,
  AUTH0_RETURN_URL,
  COOKIE_DOMAIN,
  COOKIE_SECURE,
  JWT_SECRET
} from "../config";
import {
  AUTH0_SCOPE,
  AUTH_COOKIE_EXPIRATION_LIFETIME_MS,
  AUTH_COOKIE_LIFETIME_MS,
  AUTH_COOKIE_NAME,
  JWT_EXPIRES_IN
} from "../consts";
import type { AuthUser, Jwt } from "../schema";
import { ErrorCode, JwtValidationSchema, preprocessEmail } from "../schema";
import { buildQuery, requireType, wrapAsyncHandler } from "../utils";
import { Router } from "express";
import { URL } from "node:url";
import type { UsersService } from "../types";
import jwt from "jsonwebtoken";
import { lang } from "../langs";
import { logger } from "../services";
import passport from "passport";
import zod from "zod";

/**
 * Create the authentication router.
 * @param usersService - The users service.
 * @returns Router.
 */
export function createAuthRouter(usersService: UsersService): Router {
  return Router()
    .get(
      "/callback",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Postponed
      passport.authenticate("auth0", {
        // eslint-disable-next-line no-warning-comments -- Postponed
        // TODO: Use failureReturnUrl
        failureRedirect: AUTH0_RETURN_URL,
        keepSessionInfo: true
      }),
      wrapAsyncHandler(async (req, res) => {
        if (req.isAuthenticated()) {
          const auth0User = Auth0UserValidationSchema.parse(req.user);

          const email = auth0User.emails[0].value;

          const successReturnUrl =
            typeof req.session.successReturnUrl === "string"
              ? new URL(
                  req.session.successReturnUrl,
                  AUTH0_RETURN_URL
                ).toString()
              : AUTH0_RETURN_URL;

          const queryStr = buildQuery({
            action: "login",
            user: JSON.stringify(
              requireType<AuthUser>({
                admin: ADMIN_EMAIL.includes(email),
                email
              })
            )
          });

          const token = jwt.sign(requireType<Jwt>({ email }), JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
          });

          await usersService.addUser({ email, favoriteCompanies: [] });

          await new Promise<void>((resolve, reject) => {
            req.logout((err: unknown) => {
              // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- Ok
              if (err) reject(err);
              else resolve();
            });
          });

          res
            .cookie(AUTH_COOKIE_NAME, token, {
              domain: COOKIE_DOMAIN,
              expires: new Date(Date.now() + AUTH_COOKIE_LIFETIME_MS),
              httpOnly: true,
              path: "/",
              sameSite: "strict",
              secure: COOKIE_SECURE
            })
            .redirect(`${successReturnUrl}${queryStr}`);
        } else {
          const failureReturnUrl =
            typeof req.session.failureReturnUrl === "string"
              ? new URL(
                  req.session.failureReturnUrl,
                  AUTH0_RETURN_URL
                ).toString()
              : AUTH0_RETURN_URL;

          logger.warn(lang.Auth0AuthenticationFailed, {
            requestId: req.requestId
          });
          res.redirect(
            `${failureReturnUrl}?error=${ErrorCode.AuthenticationFailed}&errorMessage=${lang.AuthenticationFailed}`
          );
        }
      })
    )
    .get(
      "/login",
      (req, _res, next) => {
        const { failureReturnUrl, successReturnUrl } = req.query;

        if (typeof failureReturnUrl === "string")
          req.session.failureReturnUrl = failureReturnUrl;
        else delete req.session.failureReturnUrl;

        if (typeof successReturnUrl === "string")
          req.session.successReturnUrl = successReturnUrl;
        else delete req.session.successReturnUrl;

        req.session.save(err => {
          if (err) next(err);
          else next();
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- Ok
      passport.authenticate("auth0", { scope: AUTH0_SCOPE })
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
          secure: COOKIE_SECURE
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

          res.json({
            admin: ADMIN_EMAIL.includes(email),
            email,
            user
          });
        } else res.json(null);
      })
    );
}

const Auth0UserValidationSchema = zod.object({
  emails: zod
    .array(zod.object({ value: preprocessEmail(zod.string().email()) }))
    .nonempty()
    .max(1)
});
