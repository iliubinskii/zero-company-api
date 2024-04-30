import { CORS_ORIGIN, ENV, PORT, SESSION_SECRET } from "./config";
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
  createUserControllers,
  createUsersRouter,
  createUsersService
} from "./users";
import { ErrorCode } from "./schema";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError } from "express-jwt";
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
import session from "express-session";

connectMongodb();
initPassport();

const categoriesService = createCategoriesService();

const companiesService = createCompaniesService();

const userService = createUsersService();

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_req, res) => {
  res.json({ status: lang.Ok });
});

app.use("/auth", authRouter);

app.use(
  "/categories",
  createCategoriesRouter(
    createCategoryControllers(categoriesService, companiesService)
  )
);

app.use(
  "/companies",
  createCompaniesRouter(createCompanyControllers(companiesService))
);

app.use(
  "/users",
  createUsersRouter(createUserControllers(userService, companiesService))
);

app.use(
  (
    err: unknown,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Ok
    _next: NextFunction
  ) => {
    logger.error(err);

    if (err instanceof UnauthorizedError)
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(buildErrorResponse(ErrorCode.Unauthorized));
    else
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

  https.createServer(httpsOptions, app).listen(PORT);
} else app.listen(PORT);
