import { MONGODB_DATABASE_NAME, MONGODB_URI } from "../config";
import mongoose from "mongoose";

export const mongodbConnection = mongoose.connect(MONGODB_URI, {
  dbName: MONGODB_DATABASE_NAME
});
