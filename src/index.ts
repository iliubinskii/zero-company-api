import { PORT } from "./config";
import { createCompaniesRouter } from "./companies";
import { createCompaniesService } from "./companies/service";
import { createCompanyControllers } from "./companies/controllers";
import express from "express";
import { initLangs } from "./langs";
import { t } from "i18next";

initLangs();

const app = express();

app.get("/", (_req, res) => {
  res.json({ greeting: t("HelloWorld") });
});

app.use(
  "/companies",
  createCompaniesRouter(createCompanyControllers(createCompaniesService()))
);

app.listen(PORT);
