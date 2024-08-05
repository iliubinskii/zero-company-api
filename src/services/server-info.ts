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
import { lang } from "../langs";
import { logger } from "./logger";
import { schema } from "../schema";

/**
 * Log server info.
 */
export function logServerInfo(): void {
  logger.info(`${lang.ZeroApiServer} ${schema.info.version}`);
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
}
