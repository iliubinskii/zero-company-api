import {
  AUTH0_CALLBACK_URL,
  AUTH0_DOMAIN,
  AUTH0_RETURN_URL,
  COOKIE_DOMAIN,
  COOKIE_SECURE,
  CORS_ORIGIN,
  ENV,
  LOG_LEVEL,
  MONGODB_DATABASE_NAME,
  PORT
} from "../config";
import { ErrorCode, schemaVersion } from "../schema";
import { buildErrorResponse, sendResponse } from "../utils";
import { Router } from "express";
import type { Routes } from "../schema";
import { StatusCodes } from "http-status-codes";
import { lang } from "../langs";
import { logger } from "../services";

export const maintenanceRouter = Router();

maintenanceRouter
  .get("/server-info", (_req, res) => {
    logger.info(`${lang.ZeroApiServer} ${schemaVersion}`);
    logger.info(`${lang.Environment}: ${ENV}`);
    logger.info(`${lang.Port}: ${PORT}`);
    logger.info(`${lang.Auth0CallbackUrl}: ${AUTH0_CALLBACK_URL}`);
    logger.info(`${lang.Auth0Domain}: ${AUTH0_DOMAIN}`);
    logger.info(`${lang.Auth0ReturnUrl}: ${AUTH0_RETURN_URL}`);
    logger.info(`${lang.CookieDomain}: ${COOKIE_DOMAIN}`);
    logger.info(`${lang.CookieSecure}: ${COOKIE_SECURE}`);
    logger.info(`${lang.CorsOrigin}: ${CORS_ORIGIN}`);
    logger.info(`${lang.LogLevel}: ${LOG_LEVEL}`);
    logger.info(`${lang.MongodbDatabaseName}: ${MONGODB_DATABASE_NAME}`);

    sendResponse<Routes["/404"]["get"]>(
      res,
      StatusCodes.NOT_FOUND,
      buildErrorResponse(ErrorCode.NotFound)
    );
  })
  .get("/sync-reject", () => {
    throw new Error("Sync error!");
  });
