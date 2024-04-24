import {
  FieldType,
  createWebAccessibleStorage
} from "./global-middleware/web-accessible-storage";
import {
  createCompaniesRouter,
  createCompaniesService,
  createCompanyControllers
} from "./companies";
import { PORT } from "./config";
import { StatusCodes } from "http-status-codes";
import { connectMongodb } from "./providers";
import { createUploadHandler } from "./global-middleware";
import express, { NextFunction, Request, Response } from "express";
import { initLangs } from "./langs";
import { logger } from "./global-services";
import { t } from "i18next";

initLangs();
connectMongodb();

const app = express();

app.get("/", (_req, res) => {
  res.json({ greeting: t("HelloWorld") });
});

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
      .json({ error: t("InternalServerError") });
  }
);

app.listen(PORT);
