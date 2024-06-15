import type { Request, Response } from "express";
import {
  SESSION_STORE_PROVIDER,
  createApp,
  lang,
  logServerInfo,
  logger,
  mongodbConnectionExists,
  redisClientExists
} from "../src";
import type express from "express";

// Cache the connection in serverless environments
let appCached: express.Express | undefined;

/**
 * Handle the request
 * @param req - Request
 * @param res - Response
 */
export default async function handler(
  req: Request,
  res: Response
): Promise<void> {
  logger.info(appCached ? lang.AppCacheHit : lang.AppCacheMiss);

  logger.info(
    mongodbConnectionExists()
      ? lang.MongodbConnectionCacheHit
      : lang.MongodbConnectionCacheMiss
  );

  if (SESSION_STORE_PROVIDER === "redis")
    logger.info(
      redisClientExists() ? lang.RedisClientCacheHit : lang.RedisClientCacheMiss
    );

  if (appCached) appCached(req, res);
  else {
    logServerInfo();
    appCached = await createApp();
    appCached(req, res);
  }
}
