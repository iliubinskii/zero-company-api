/* eslint-disable no-sync -- Ok */

import { CORS_ORIGIN, ENV, PORT, SECURE_PORT, SESSION_SECRET } from "./config";
import {
  MONGODB_SESSIONS_COLLECTION,
  MONGODB_SESSIONS_TTL_SEC,
  SESSION_LIFETIME_MS
} from "./consts";
import { appendJwt, logRequest, requestId } from "./middleware";
import {
  authRouter,
  createCategoriesRouter,
  createCategoriesService,
  createCategoryControllers,
  createCompaniesRouter,
  createCompaniesService,
  createCompanyControllers,
  createMeRouter,
  createUserControllers,
  createUsersRouter,
  createUsersService,
  testRouter
} from "./routes";
import { initMongodb, initPassport } from "./providers";
import { ErrorCode } from "./schema";
import MongoStore from "connect-mongo";
import { StatusCodes } from "http-status-codes";
import { buildErrorResponse } from "./utils";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { favicon } from "./public";
import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import { lang } from "./langs";
import { logger } from "./services";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Should server be restarted on a rejection and how?
// eslint-disable-next-line github/no-then -- Ok
initMongodb().catch((err: unknown) => {
  logger.error(lang.MongodbError, err);
});

initPassport();

const categoriesService = createCategoriesService();

const companiesService = createCompaniesService();

const userService = createUsersService();

const categoryControllers = createCategoryControllers(
  categoriesService,
  companiesService
);

const companyControllers = createCompanyControllers(companiesService);

const userControllers = createUserControllers(userService, companiesService);

const app = express();

app.use(requestId);
app.use(logRequest);
app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(cookieParser());
app.use(
  session({
    cookie: {
      httpOnly: true,
      maxAge: SESSION_LIFETIME_MS,
      secure: true
    },
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      collectionName: MONGODB_SESSIONS_COLLECTION,
      ttl: MONGODB_SESSIONS_TTL_SEC
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(appendJwt);

app.get("/", (_req, res) => {
  res.json({ status: lang.Ok });
});

app.get("/favicon.ico", (_req, res) => {
  const buffer = Buffer.from(favicon, "base64");

  res.contentType("ico").send(buffer);
});

app.use("/auth", authRouter);

app.use("/categories", createCategoriesRouter(categoryControllers));

app.use("/companies", createCompaniesRouter(companyControllers));

app.use("/me", createMeRouter(userControllers));

app.use("/test", testRouter);

app.use("/users", createUsersRouter(userControllers));

app.all("*", (_req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json(buildErrorResponse(ErrorCode.NotFound));
});

app.use(
  (
    err: unknown,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Ok
    _next: NextFunction
  ) => {
    logger.error(lang.ServerError, err, { requestId: req.requestId });
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(buildErrorResponse(ErrorCode.InternalServerError));
  }
);

if (ENV === "development") {
  const httpsOptions = {
    cert: fs.readFileSync("./certificates/localhost.pem"),
    key: fs.readFileSync("./certificates/localhost-key.pem")
  } as const;

  http.createServer(app).listen(PORT, () => {
    logger.info(lang.ServerStarted);
  });

  https.createServer(httpsOptions, app).listen(SECURE_PORT, () => {
    logger.info(lang.SecureServerStarted);
  });
}

export default app;
