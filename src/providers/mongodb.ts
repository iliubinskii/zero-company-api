import {
  MONGODB_CONNECT_TIMEOUT_MS,
  MONGODB_SOCKET_TIMEOUT_MS
} from "../consts";
import { MONGODB_DATABASE_NAME, MONGODB_URI } from "../config";
import { lang } from "../langs";
import { logger } from "../services";
import mongoose from "mongoose";

// Cache the connection in serverless environments
let cachedConnection: typeof mongoose | undefined;

/**
 * Connect to MongoDB.
 * @returns Connection.
 */
export async function getMongodbConnection(): Promise<typeof mongoose> {
  if (cachedConnection) return cachedConnection;

  logger.info(lang.CreatingMongodbConnection);

  cachedConnection = await mongoose.connect(MONGODB_URI, {
    connectTimeoutMS: MONGODB_CONNECT_TIMEOUT_MS,
    dbName: MONGODB_DATABASE_NAME,
    socketTimeoutMS: MONGODB_SOCKET_TIMEOUT_MS
  });

  return cachedConnection;
}

/**
 * Initialize MongoDB.
 */
export function initMongodb(): void {
  mongoose.connection.removeAllListeners();

  for (const [event, message] of Object.entries(events))
    mongoose.connection.on(event, err => {
      if (err) logger.error(message, err);

      logger.info(message);
    });
}

/**
 * Check if MongoDB connection exists.
 * @returns Whether MongoDB connection exists.
 */
export function mongodbConnectionExists(): boolean {
  return Boolean(cachedConnection);
}

/**
 * Disconnect from MongoDB.
 */
export async function mongodbDisconnect(): Promise<void> {
  if (cachedConnection) {
    await cachedConnection.disconnect();
    cachedConnection = undefined;
  }
}

const events = {
  all: lang.MongodbAll,
  close: lang.MongodbClose,
  connected: lang.MongodbConnected,
  connecting: lang.MongodbConnecting,
  disconnected: lang.MongodbDisconnected,
  disconnecting: lang.MongodbDisconnecting,
  error: lang.MongodbError,
  fullsetup: lang.MongodbFullSetup,
  open: lang.MongodbOpen,
  reconnected: lang.MongodbReconnected,
  reconnectfailed: lang.MongodbReconnectFailed
} as const;
