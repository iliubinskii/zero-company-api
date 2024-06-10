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
 * Get the session store
 * @returns Session store
 */
export function getSessionStore(): MongoStore | RedisStore | undefined {
  switch (SESSION_STORE_PROVIDER) {
    case "memory": {
      return undefined;
    }

    case "mongodb": {
      return MongoStore.create({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Postponed
        // @ts-expect-error
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
