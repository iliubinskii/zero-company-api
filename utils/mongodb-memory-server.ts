import { MongoMemoryServer } from "mongodb-memory-server";

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
