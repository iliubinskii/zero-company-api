import { REDIS_URL } from "../config";
import { createClient } from "redis";
import { lang } from "../langs";
import { logger } from "../services";

// Cache the connection in serverless environments
let cachedClient: ReturnType<typeof createClient> | null = null;

export const redisClientCacheResult = Boolean(cachedClient);

/**
 * Get Redis client
 * @returns Redis client
 */
export function getRedisClient(): ReturnType<typeof createClient> {
  if (cachedClient) return cachedClient;

  cachedClient = createClient({ url: REDIS_URL });

  return cachedClient;
}

/**
 * Initialize Redis
 */
export function initRedis(): void {
  const client = getRedisClient();

  client
    .connect()
    // eslint-disable-next-line github/no-then -- Ok
    .then(() => {
      logger.info(lang.RedisConnected);
    })
    // eslint-disable-next-line github/no-then -- Ok
    .catch((err: unknown) => {
      logger.error(lang.RedisError, err);
    });
}
