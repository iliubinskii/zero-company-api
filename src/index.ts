import {
  CompanyModel,
  createCompaniesRouter,
  createCompaniesService,
  createCompanyControllers
} from "./companies";
import {
  FieldType,
  createWebAccessibleStorage
} from "./global-middleware/web-accessible-storage";
import {
  createCategoriesRouter,
  createCategoriesService,
  createCategoryControllers
} from "./categories";
import { PORT } from "./config";
import { StatusCodes } from "http-status-codes";
import { connectMongodb } from "./providers";
import { createUploadHandler } from "./global-middleware";
import express, { NextFunction, Request, Response } from "express";
import { lang } from "./langs";
import { logger } from "./global-services";

connectMongodb();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ greeting: lang.HelloWorld });
});

app.use(
  "/categories",
  createCategoriesRouter(
    createCategoryControllers(createCategoriesService(CompanyModel))
  )
);

app.use(
  "/companies",
  createCompaniesRouter(createCompanyControllers(createCompaniesService()))
);

app.post(
  "/test-upload",
  createUploadHandler({
    header: 1,
    images: 10,
    logo: 1
  }),
  createWebAccessibleStorage({
    header: FieldType.single,
    images: FieldType.multiple,
    logo: FieldType.single
  }),
  (req, res) => {
    res.json({ uploads: req.body });
  }
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: lang.InternalServerError });
  }
);

app.listen(PORT);
