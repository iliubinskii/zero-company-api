import { CORS_ORIGIN, SESSION_SECRET } from "./config";
import { ErrorCode, Routes, schemaVersion } from "./schema";
import {
  appendJwt,
  forceHttps,
  logRequest,
  logResponse,
  middlewareExclusion,
  requestId
} from "./middleware";
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
import { buildErrorResponse, sendResponse } from "./utils";
import { initMongodb, initPassport } from "./providers";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response, json } from "express";
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

  initMongodb();
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
  app.use(logResponse);

  app.use(cors({ credentials: true, origin: CORS_ORIGIN }));

  app.use(express.static("public"));

  app.use(
    middlewareExclusion(forceHttps, [
      ["GET", "/"],
      ["GET", "/categories"],
      ["GET", /^\/categories\/\w+$/u],
      ["GET", /^\/categories\/\w+\/companies$/u],
      ["GET", "/companies"]
    ])
  );

  app.use(cookieParser());
  app.use(
    session({
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

  app.use("/auth", authRouter);

  app.use("/categories", createCategoriesRouter(categoryControllers));

  app.use("/companies", createCompaniesRouter(companyControllers));

  app.use("/me", createMeRouter(userControllers));

  app.use("/test", testRouter);

  app.use("/users", createUsersRouter(userControllers));

  app.all("*", (_req, res) => {
    sendResponse(
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
      sendResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        buildErrorResponse(ErrorCode.InternalServerError)
      );
    }
  );

  return app;
}