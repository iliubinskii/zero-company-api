import { Router } from "express";
import { lang } from "../langs";
import { logServerInfo } from "../services";

export const maintenanceRouter = Router();

maintenanceRouter.get("/server-info", (_req, res) => {
  logServerInfo();
  res.json({ message: lang.ServerInfoLogged });
});
