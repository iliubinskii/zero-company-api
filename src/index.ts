import { PORT } from "./config";
import { connectMongodb } from "./providers";
import { createCompaniesRouter } from "./companies";
import { createCompaniesService } from "./companies/service";
import { createCompanyControllers } from "./companies/controllers";
import { createUploadHandler } from "./global-middleware";
import express from "express";
import { initLangs } from "./langs";
import { t } from "i18next";
import { webAccessibleStorage } from "./global-middleware/web-accessible-storage";

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
  createUploadHandler([
    { maxCount: 1, name: "header" },
    { maxCount: 1, name: "logo" },
    { maxCount: 10, name: "images[]" }
  ]),
  webAccessibleStorage,
  (req, res) => {
    res.json({ uploads: req.customUploads });
  }
);

app.listen(PORT);
