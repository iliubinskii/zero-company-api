import { REDIS_URL } from "../config";
import { createClient } from "redis";
import { lang } from "../langs";
import { logger } from "../services";

// Cache the client in serverless environments
let cachedClient: ReturnType<typeof createClient> | undefined;

/**
 * Get Redis client.
 * @returns Redis client.
 */
export function getRedisClient(): ReturnType<typeof createClient> {
  if (cachedClient) return cachedClient;

  logger.info(lang.CreatingRedisClient);

  cachedClient = createClient({ url: REDIS_URL });

  return cachedClient;
}

/**
 * Initialize Redis.
 */
export async function initRedis(): Promise<void> {
  const client = getRedisClient();

  try {
    logger.info(lang.RedisConnecting);
    await client.connect();
    logger.info(lang.RedisConnected);
  } catch (err) {
    logger.error(lang.RedisError, err);
  }
}

/**
 * Check if Redis client exists.
 * @returns Whether Redis client exists.
 */
export function redisClientExists(): boolean {
  return Boolean(cachedClient);
}
