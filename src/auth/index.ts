import { AUTH0_SCOPE } from "../consts";
import { ErrorCode } from "../schema";
import { StatusCodes } from "http-status-codes";
import { buildErrorResponse } from "../utils";
import express from "express";
import passport from "passport";

export const authRouter = express.Router();

authRouter
  .get(
    "/login",
    passport.authenticate("auth0", { scope: AUTH0_SCOPE }),
    (_req, res) => {
      res.redirect("/");
    }
  )
  .get(
    "/callback",
    passport.authenticate("auth0", { failureRedirect: "/login" }),
    (_req, res) => {
      res.redirect("/user");
    }
  )
  .get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  })
  .get("/user", (req, res) => {
    if (req.user) res.send({ user: req.user });
    else
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send(buildErrorResponse(ErrorCode.Unauthorized));
  });
