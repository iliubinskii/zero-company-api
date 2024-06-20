import {
  COOKIE_SECURE,
  CORS_ORIGIN,
  SESSION_SECRET,
  SESSION_STORE_PROVIDER
} from "./config";
import type { NextFunction, Request, Response } from "express";
import {
  appendJwt,
  logRequest,
  logResponse,
  parseNestedQuery,
  requestId
} from "./middleware";
import { buildErrorResponse, sendResponse } from "./utils";
import {
  createAuthRouter,
  createCategoriesRouter,
  createCategoriesService,
  createCategoryControllers,
  createCompaniesRouter,
  createCompaniesService,
  createCompanyControllers,
  createCompanyImageControllers,
  createCompanyImagesService,
  createDocumentControllers,
  createDocumentsRouter,
  createDocumentsService,
  createMeRouter,
  createUserControllers,
  createUsersRouter,
  createUsersService,
  testRouter
} from "./routes";
import { createSessionStore, logger } from "./services";
import { initAuth0Passport, initMongodb, initRedis } from "./providers";
import { ErrorCode } from "./schema";
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
export async function createApp(): Promise<express.Express> {
  // eslint-disable-next-line no-warning-comments -- Assigned
  // TODO: Add listings router

  initAuth0Passport();
  initMongodb();

  if (SESSION_STORE_PROVIDER === "redis") await initRedis();

  const categoriesService = createCategoriesService();

  const companiesService = createCompaniesService();

  const companyImagesService = createCompanyImagesService();

  const documentsService = createDocumentsService();

  const usersService = createUsersService();

  const categoryControllers = createCategoryControllers(
    categoriesService,
    companiesService
  );

  const companyControllers = createCompanyControllers(companiesService);

  const companyImageControllers =
    createCompanyImageControllers(companyImagesService);

  const documentControllers = createDocumentControllers(documentsService);

  const userControllers = createUserControllers(
    usersService,
    companiesService,
    documentsService
  );

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
  app.use(json());
  app.use(parseNestedQuery);

  app.use(
    session({
      cookie: { secure: COOKIE_SECURE },
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET,
      store: createSessionStore()
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(appendJwt);

  app.get("/", (_req, res) => {
    sendResponse<Routes["/"]["get"]>(res, StatusCodes.OK, {
      schema: "/schema.yaml",
      status: ErrorCode.OK
    });
  });

  app.use("/auth", createAuthRouter(usersService));

  app.use("/categories", createCategoriesRouter(categoryControllers));

  app.use(
    "/companies",
    createCompaniesRouter(companyControllers, companyImageControllers)
  );

  app.use("/documents", createDocumentsRouter(documentControllers));

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
