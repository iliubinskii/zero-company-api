import { MongoMemoryServer } from "mongodb-memory-server";
import { TEST_MONGODB_PORT } from "../src";

let server: MongoMemoryServer | undefined;

/**
 * Setup an in-memory MongoDB server for testing.
 */
export async function createMongodbMemoryServer(): Promise<void> {
  server ??= await MongoMemoryServer.create({ instance: { port: 27_017 } });
}

/**
 * Teardown the in-memory MongoDB server.
 */
export async function stopMongodbMemoryServer(): Promise<void> {
  if (server) await server.stop();
}

/**
 * Get the URI for the in-memory MongoDB server.
 * @returns The URI for the in-memory MongoDB server.
 */
export function getMongodbMemoryServerUri(): string {
  return `mongodb://127.0.0.1:${TEST_MONGODB_PORT}/`;
}
