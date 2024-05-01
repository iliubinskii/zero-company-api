import { CORS_ORIGIN, ENV, PORT, SESSION_SECRET } from "./config";
import { appendJwt, logRequest, requestId } from "./global-middleware";
import { connectMongodb, initPassport } from "./providers";
import {
  createCategoriesRouter,
  createCategoriesService,
  createCategoryControllers
} from "./categories";
import {
  createCompaniesRouter,
  createCompaniesService,
  createCompanyControllers
} from "./companies";
import {
  createMeRouter,
  createUserControllers,
  createUsersRouter,
  createUsersService
} from "./users";
import { ErrorCode } from "./schema";
import { StatusCodes } from "http-status-codes";
import { authRouter } from "./auth";
import { buildErrorResponse } from "./utils";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fs from "node:fs";
import https from "node:https";
import { lang } from "./langs";
import { logger } from "./global-services";
import passport from "passport";
import path from "node:path";
import session from "express-session";
import { testRouter } from "./test";

connectMongodb();
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
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(appendJwt);

// eslint-disable-next-line unicorn/prefer-module -- Ok
app.use(express.static(path.join(path.dirname(__dirname), "public")));

app.get("/", (_req, res) => {
  res.json({ status: lang.Ok });
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
    logger.error(lang.ServerError, { requestId: req.requestId });
    logger.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(buildErrorResponse(ErrorCode.InternalServerError));
  }
);

if (ENV === "development") {
  const httpsOptions = {
    // eslint-disable-next-line no-sync -- Ok
    cert: fs.readFileSync("./certificates/localhost.pem"),
    // eslint-disable-next-line no-sync -- Ok
    key: fs.readFileSync("./certificates/localhost-key.pem")
  };

  https.createServer(httpsOptions, app).listen(PORT, () => {
    logger.info(lang.ServerStarted);
  });
} else
  app.listen(PORT, () => {
    logger.info(lang.ServerStarted);
  });
