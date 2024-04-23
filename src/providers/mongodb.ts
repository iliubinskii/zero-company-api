import mongoose from "mongoose";

/**
 * Connects to MongoDB.
 * @param endpoint - Endpoint to connect to MongoDB.
 * @param databaseName - Name of the database to connect to.
 */
export async function connectMongodb(endpoint: string, databaseName: string) {
  await mongoose.connect(endpoint, { dbName: databaseName });
}
