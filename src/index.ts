import { CORS_ORIGIN, ENV, PORT, SESSION_SECRET } from "./config";
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
import { connectMongodb, initPassport } from "./providers";
import { ErrorCode } from "./schema";
import { StatusCodes } from "http-status-codes";
import { buildErrorResponse } from "./utils";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { favicon } from "./public";
import fs from "node:fs";
import https from "node:https";
import { lang } from "./langs";
import { logger } from "./services";
import passport from "passport";
import session from "express-session";

// eslint-disable-next-line @typescript-eslint/no-floating-promises -- Ok
app();

/**
 * Creates an Express app or an https server
 * @returns Express app or https server
 */
async function app(): Promise<void> {
  try {
    await connectMongodb();
    initPassport();

    const categoriesService = createCategoriesService();

    const companiesService = createCompaniesService();

    const userService = createUsersService();

    const categoryControllers = createCategoryControllers(
      categoriesService,
      companiesService
    );

    const companyControllers = createCompanyControllers(companiesService);

    const userControllers = createUserControllers(
      userService,
      companiesService
    );

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
    }
    app.listen(PORT, () => {
      logger.info(lang.ServerStarted);
    });
  } catch (err) {
    logger.error(err);
  }
}
