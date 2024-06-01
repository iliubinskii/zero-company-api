import type { Request, Response } from "express";
import {
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
  if (appExists()) {
    // Log the server info only once
  } else logServerInfo();

  logger.info(appExists() ? lang.AppCacheHit : lang.AppCacheMiss);
  logger.info(
    mongodbConnectionExists()
      ? lang.MongodbConnectionCacheHit
      : lang.MongodbConnectionCacheMiss
  );
  logger.info(
    redisClientExists() ? lang.RedisClientCacheHit : lang.RedisClientCacheMiss
  );

  appCached = await getApp();

  appCached(req, res);
}

/**
 * Check if the app exists
 * @returns Whether the app exists
 */
function appExists(): boolean {
  return Boolean(appCached);
}

/**
 * Get Redis client
 * @returns Redis client
 */
async function getApp(): Promise<express.Express> {
  if (appCached) return appCached;

  logger.info(lang.CreatingApp);

  appCached = await createApp();

  return appCached;
}
