import { PORT } from "./config";
import express from "express";
import { initLangs } from "./langs";
import { t } from "i18next";

initLangs();

const app = express();

app.get("/", (_req, res) => {
  const greeting = t("greeting");

  res.json({ greeting });
});

app.listen(PORT);
