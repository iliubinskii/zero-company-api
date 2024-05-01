import {
  ADMIN_EMAIL,
  AUTH0_RETURN_URL,
  COOKIE_DOMAIN,
  JWT_SECRET
} from "../config";
import {
  AUTH0_SCOPE,
  AUTH_COOKIE_EXPIRATION_LIFETIME,
  AUTH_COOKIE_LIFETIME,
  AUTH_COOKIE_NAME,
  JWT_EXPIRES_IN
} from "../consts";
import { JwtUser } from "../schema";
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import zod from "zod";

export const authRouter = express.Router();

authRouter
  .get(
    "/callback",
    // eslint-disable-next-line no-warning-comments -- Postponed
    // TODO
    // - Create a new user in MongoDB if it doesn't exist
    // - Maybe store random ID to MongoDB user and JWT and use it to verify user
    passport.authenticate("auth0", {
      failureRedirect: AUTH0_RETURN_URL
    }),
    (req, res, next) => {
      if (req.isAuthenticated()) {
        const user = UserValidationSchema.parse(req.user);

        const token = jwt.sign({ email: user.emails[0].value }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN
        });

        req.logout(err => {
          if (err) next(err);
          else
            res
              .cookie(AUTH_COOKIE_NAME, token, {
                domain: COOKIE_DOMAIN,
                expires: new Date(Date.now() + AUTH_COOKIE_LIFETIME),
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
    passport.authenticate("auth0", { scope: AUTH0_SCOPE }),
    (_req, res) => {
      res.redirect(AUTH0_RETURN_URL);
    }
  )
  .get("/logout", (_req, res) => {
    res
      .cookie(AUTH_COOKIE_NAME, "", {
        domain: COOKIE_DOMAIN,
        expires: new Date(Date.now() - AUTH_COOKIE_EXPIRATION_LIFETIME),
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: true
      })
      .redirect(AUTH0_RETURN_URL);
  })
  .get("/me", (req, res) => {
    // eslint-disable-next-line security/detect-object-injection -- Ok
    const token = req.cookies[AUTH_COOKIE_NAME] as unknown;

    if (typeof token === "string")
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) res.json(null);
        else {
          const email = JwtValidationSchema.parse(decoded).email.toLowerCase();

          const jwtUser: JwtUser = {
            admin: ADMIN_EMAIL.includes(email),
            email
          };

          res.json(jwtUser);
        }
      });
    else res.json(null);
  });

const JwtValidationSchema = zod
  // Do not use strictObject: JWT may contain additional fields
  .object({
    email: zod.string().email()
  });

const UserValidationSchema = zod
  // Do not use strictObject: auth0 may return additional fields
  .object({
    emails: zod
      .array(
        zod.strictObject({
          value: zod.string()
        })
      )
      .nonempty()
      .max(1)
  });
