import { JWT_SECRET, PORT } from "./config";
import { UnauthorizedError, expressjwt } from "express-jwt";
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
import { ErrorCode } from "./schema";
import { StatusCodes } from "http-status-codes";
import { buildErrorResponse } from "./utils";
import { connectMongodb } from "./providers";
import express, { NextFunction, Request, Response } from "express";
import { lang } from "./langs";
import { logger } from "./global-services";

connectMongodb();

const categoriesService = createCategoriesService();

const companiesService = createCompaniesService();

const app = express();

app.use(express.json());
app.use(
  expressjwt({
    algorithms: ["HS256"],
    requestProperty: "auth",
    secret: JWT_SECRET
  })
);

app.get("/", (_req, res) => {
  res.json({ status: lang.Ok });
});

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

app.listen(PORT);
