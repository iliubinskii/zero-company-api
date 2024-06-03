import {
  COOKIE_SECURE,
  CORS_ORIGIN,
  MONGODB_DATABASE_NAME,
  SESSION_SECRET
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
  createDocumentControllers,
  createDocumentsRouter,
  createDocumentsService,
  createMeRouter,
  createUserControllers,
  createUsersRouter,
  createUsersService,
  getUserModel,
  testRouter
} from "./routes";
import {
  getMongodbConnection,
  initAuth0Passport,
  initMongodb
} from "./providers";
import { ErrorCode } from "./schema";
import { MONGODB_SESSIONS_COLLECTION } from "./consts";
import MongoStore from "connect-mongo";
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
export async function createApp(): Promise<express.Express> {
  initAuth0Passport();
  initMongodb();

  // Roll back to use MongoDB for session storage
  // await initRedis();
  await Promise.resolve();

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
  app.use(json());
  app.use(parseNestedQuery);

  app.use(
    session({
      cookie: { secure: COOKIE_SECURE },
      resave: false,
      saveUninitialized: false,
      secret: SESSION_SECRET,
      // Roll back to use MongoDB for session storage
      /*
      store: new RedisStore({
        client: getRedisClient(),
        prefix: REDIS_PREFIX
      }),
      */
      store: MongoStore.create({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Postponed
        // @ts-expect-error
        clientPromise: (async () => {
          const connection = await getMongodbConnection();

          return connection.connection.getClient();
        })(),
        collectionName: MONGODB_SESSIONS_COLLECTION,
        dbName: MONGODB_DATABASE_NAME
      })
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

  app.use("/companies", createCompaniesRouter(companyControllers));

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
