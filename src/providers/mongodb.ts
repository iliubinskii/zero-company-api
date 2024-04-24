import { MONGODB_DATABASE_NAME, MONGODB_URI } from "../config";
import mongoose from "mongoose";

/**
 * Connects to MongoDB.
 */
export async function connectMongodb() {
  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DATABASE_NAME });
}
