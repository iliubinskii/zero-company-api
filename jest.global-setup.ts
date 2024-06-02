import { createMongodbMemoryServer } from "./utils";

/**
 * Global setup function for Jest.
 */
export default async function globalSetup(): Promise<void> {
  await createMongodbMemoryServer();
}
