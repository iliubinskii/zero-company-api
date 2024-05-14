/* eslint-disable import/no-internal-modules -- Ok */
/* eslint-disable import/no-namespace -- Ok */
/* eslint-disable node/no-unpublished-import -- Ok */

import * as config from "./src/config";
import { MongoMemoryServer } from "mongodb-memory-server";
import { disconnectMongodb } from "./src/providers/mongodb";

jest.mock("./src/config");

let mongoServer: MongoMemoryServer | undefined;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Ok
  // @ts-expect-error
  config.MONGODB_URI = mongoServer.getUri();
});

afterAll(async () => {
  await disconnectMongodb();

  if (mongoServer) await mongoServer.stop();
});
