import {
  AUTH0_CALLBACK_URL,
  AUTH0_DOMAIN,
  AUTH0_RETURN_URL,
  COOKIE_DOMAIN,
  CORS_ORIGIN,
  ENV,
  LOG_LEVEL,
  MONGODB_DATABASE_NAME,
  PORT,
  SESSION_SECRET
} from "./config";
import { ErrorCode, schemaVersion } from "./schema";
import type { NextFunction, Request, Response } from "express";
import { appendJwt, logRequest, logResponse, requestId } from "./middleware";
import { buildErrorResponse, sendResponse } from "./utils";
import {
  createAuthRouter,
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
  getUserModel,
  testRouter
} from "./routes";
import { initAuth0Passport, initMongodb } from "./providers";
import type { Routes } from "./schema";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json } from "express";
import globToRegExp from "glob-to-regexp";
import { lang } from "./langs";
import { logger } from "./services";
import passport from "passport";
import session from "express-session";

/**
 * Create the Express app
 * @returns App
 */
export function createApp(): express.Express {
  logger.info(`${lang.ZeroApiServer} ${schemaVersion}`);
  logger.info(`${lang.Environment}: ${ENV}`);
  logger.info(`${lang.Port}: ${PORT}`);
  logger.info(`${lang.Auth0CallbackUrl}: ${AUTH0_CALLBACK_URL}`);
  logger.info(`${lang.Auth0Domain}: ${AUTH0_DOMAIN}`);
  logger.info(`${lang.Auth0ReturnUrl}: ${AUTH0_RETURN_URL}`);
  logger.info(`${lang.CookieDomain}: ${COOKIE_DOMAIN}`);
  logger.info(`${lang.CorsOrigin}: ${CORS_ORIGIN}`);
  logger.info(`${lang.LogLevel}: ${LOG_LEVEL}`);
  logger.info(`${lang.MongodbDatabaseName}: ${MONGODB_DATABASE_NAME}`);

  initMongodb();
  initAuth0Passport();

  const categoriesService = createCategoriesService();

  const companiesService = createCompaniesService(getUserModel);

  const usersService = createUsersService();

  const categoryControllers = createCategoryControllers(
    categoriesService,
    companiesService
  );

  const companyControllers = createCompanyControllers(companiesService);

  const userControllers = createUserControllers(usersService, companiesService);

  const app = express();

  app.use(requestId);
  app.use(logRequest);
  app.use(logResponse);

  app.use(
    cors({
      credentials: true,
      origin: globToRegExp(CORS_ORIGIN, { flags: "iu" })
    })
  );

  app.use(express.static("public"));

  app.use(cookieParser());
  app.use(
    session({
      cookie: { secure: ENV !== "development" },
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(appendJwt);

  app.use(json());

  app.get("/", (_req, res) => {
    sendResponse<Routes["/"]["get"]>(res, StatusCodes.OK, {
      schema: "/schema.yaml",
      status: ErrorCode.OK
    });
  });

  app.use("/auth", createAuthRouter(usersService));

  app.use("/categories", createCategoriesRouter(categoryControllers));

  app.use("/companies", createCompaniesRouter(companyControllers));

  app.use("/me", createMeRouter(userControllers));

  app.use("/test", testRouter);

  app.use("/users", createUsersRouter(userControllers));

  app.use("/400", (_req, res) => {
    sendResponse<Routes["/400"]["get"]>(
      res,
      StatusCodes.BAD_REQUEST,
      buildErrorResponse(ErrorCode.BadRequest)
    );
  });

  app.use("/404", (_req, res) => {
    sendResponse<Routes["/404"]["get"]>(
      res,
      StatusCodes.NOT_FOUND,
      buildErrorResponse(ErrorCode.NotFound)
    );
  });

  app.use("/500", (_req, res) => {
    sendResponse<Routes["/500"]["get"]>(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      buildErrorResponse(ErrorCode.InternalServerError)
    );
  });

  app.all("*", (_req, res) => {
    sendResponse<Routes["/404"]["get"]>(
      res,
      StatusCodes.NOT_FOUND,
      buildErrorResponse(ErrorCode.NotFound)
    );
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
      sendResponse<Routes["/500"]["get"]>(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        buildErrorResponse(ErrorCode.InternalServerError)
      );
    }
  );

  return app;
}
