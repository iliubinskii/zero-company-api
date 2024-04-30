import {
  AUTH0_LOGIN_FAILURE_URL,
  AUTH0_LOGIN_SUCCESS_URL,
  AUTH0_LOGOUT_URL,
  COOKIE_DOMAIN,
  JWT_SECRET
} from "../config";
import { AUTH0_SCOPE, AUTH_TOKEN_COOKIE_NAME, JWT_EXPIRES_IN } from "../consts";
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import zod from "zod";

export const authRouter = express.Router();

authRouter
  .get(
    "/login",
    passport.authenticate("auth0", { scope: AUTH0_SCOPE }),
    (_req, res) => {
      res.redirect(AUTH0_LOGIN_FAILURE_URL);
    }
  )
  .get(
    "/callback",
    // eslint-disable-next-line no-warning-comments -- Postponed
    // TODO
    // - Create a new user in MongoDB if it doesn't exist
    // - Maybe store random ID to MongoDB user and JWT and use it to verify user
    passport.authenticate("auth0", {
      failureRedirect: AUTH0_LOGIN_FAILURE_URL
    }),
    (req, res) => {
      if (req.isAuthenticated()) {
        const user = UserValidationSchema.parse(req.user);

        const token = jwt.sign({ email: user.emails[0].value }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN
        });

        res.cookie(AUTH_TOKEN_COOKIE_NAME, token, {
          domain: COOKIE_DOMAIN,
          httpOnly: true,
          path: "/",
          sameSite: "strict",
          secure: true
        });

        res.redirect(AUTH0_LOGIN_SUCCESS_URL);
      } else res.redirect(AUTH0_LOGIN_FAILURE_URL);
    }
  )
  .get(
    "/logout",
    // eslint-disable-next-line no-warning-comments -- Postponed
    // TODO: Also remove cookie
    (req, res) => {
      req.logout();
      res.redirect(AUTH0_LOGOUT_URL);
    }
  )
  .get("/me", (req, res) => {
    // eslint-disable-next-line security/detect-object-injection -- Ok
    const token = req.cookies[AUTH_TOKEN_COOKIE_NAME] as unknown;

    if (typeof token === "string")
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) res.json(null);
        else res.json(JwtValidationSchema.parse(decoded));
      });
    else res.json(null);
  });

const JwtValidationSchema = zod.object({
  email: zod.string().email()
});

const UserValidationSchema = zod.object({
  emails: zod
    .array(
      zod.object({
        value: zod.string()
      })
    )
    .nonempty()
    .max(1)
});
