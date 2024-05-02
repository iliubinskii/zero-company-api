import { MONGODB_DATABASE_NAME, MONGODB_URI } from "../config";
import { lang } from "../langs";
import { logger } from "../services";
import mongoose from "mongoose";

/**
 * Connect to MongoDB
 */
export function initMongodb(): void {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises -- Ok
  initMongodbAsync();
}

/**
 * Connect to MongoDB
 */
export async function initMongodbAsync(): Promise<void> {
  mongoose.connection
    .on("connected", () => {
      logger.info(lang.MongodbConnected);
    })
    .on("open", () => {
      logger.info(lang.MongodbOpen);
    })
    .on("disconnected", () => {
      logger.warn(lang.MongodbDisconnected);
    })
    .on("reconnected", () => {
      logger.warn(lang.MongodbReconnected);
    })
    .on("disconnecting", () => {
      logger.warn(lang.MongodbDisconnecting);
    })
    .on("close", () => {
      logger.warn(lang.MongodbClose);
    });

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DATABASE_NAME
    });
  } catch (err) {
    logger.error(lang.MongodbError);
    logger.error(err);
  }
}
