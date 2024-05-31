import {
  COOKIE_SECURE,
  CORS_ORIGIN,
  REDIS_PREFIX,
  SESSION_SECRET
} from "./config";
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
  createDocumentControllers,
  createDocumentsRouter,
  createDocumentsService,
  createMeRouter,
  createUserControllers,
  createUsersRouter,
  createUsersService,
  getUserModel,
  maintenanceRouter,
  testRouter
} from "./routes";
import {
  getRedisClient,
  initAuth0Passport,
  initMongodb,
  initRedis
} from "./providers";
import { logServerInfo, logger } from "./services";
import { ErrorCode } from "./schema";
import RedisStore from "connect-redis";
import type { Routes } from "./schema";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json } from "express";
import globToRegExp from "glob-to-regexp";
import { lang } from "./langs";
import passport from "passport";
import session from "express-session";

/**
 * Create the Express app
 * @returns App
 */
export function createApp(): express.Express {
  logServerInfo();
  initAuth0Passport();
  initMongodb();
  initRedis();

  const categoriesService = createCategoriesService();

  const companiesService = createCompaniesService(getUserModel);

  const documentsService = createDocumentsService(getUserModel);

  const usersService = createUsersService();

  const categoryControllers = createCategoryControllers(
    categoriesService,
    companiesService
  );

  const companyControllers = createCompanyControllers(companiesService);

  const documentControllers = createDocumentControllers(documentsService);

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
      cookie: { secure: COOKIE_SECURE },
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET,
      store: new RedisStore({
        client: getRedisClient(),
        prefix: REDIS_PREFIX
      })
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

  app.use("/documents", createDocumentsRouter(documentControllers));

  app.use("/maintenance", maintenanceRouter);

  app.use("/me", createMeRouter(userControllers));

  app.use("/test", testRouter);

  app.use("/users", createUsersRouter(userControllers));

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
