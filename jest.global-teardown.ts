import { stopMongodbMemoryServer } from "./utils";

/**
 * Global teardown function for Jest.
 */
export default async function globalTeardown(): Promise<void> {
  await stopMongodbMemoryServer();
}
