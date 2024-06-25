import {
  MONGODB_DATABASE_NAME,
  REDIS_PREFIX,
  SESSION_STORE_PROVIDER
} from "../config";
import { getMongodbConnection, getRedisClient } from "../providers";
import { MONGODB_SESSIONS_COLLECTION } from "../consts";
import MongoStore from "connect-mongo";
import RedisStore from "connect-redis";

/**
 * Create a session store based on the configured provider.
 * @returns The session store instance.
 */
export function createSessionStore(): MongoStore | RedisStore | undefined {
  switch (SESSION_STORE_PROVIDER) {
    case "memory": {
      return undefined;
    }

    case "mongodb": {
      return MongoStore.create({
        clientPromise: (async () => {
          const { connection } = await getMongodbConnection();

          return connection.getClient();
        })(),
        collectionName: MONGODB_SESSIONS_COLLECTION,
        dbName: MONGODB_DATABASE_NAME
      });
    }

    case "redis": {
      return new RedisStore({
        client: getRedisClient(),
        prefix: REDIS_PREFIX
      });
    }
  }
}
