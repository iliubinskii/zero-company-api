import { MONGODB_DATABASE_NAME, MONGODB_URI } from "../config";
import { lang } from "../langs";
import { logger } from "../services";
import mongoose from "mongoose";

/**
 * Connect to MongoDB
 */
export async function initMongodb(): Promise<void> {
  for (const [event, message] of Object.entries(events))
    mongoose.connection.on(event, err => {
      logger.info(message, err);
    });

  await mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DATABASE_NAME
  });
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
};
