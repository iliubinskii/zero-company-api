/* eslint-disable @typescript-eslint/ban-ts-comment -- Ok */
/* eslint-disable import/no-internal-modules -- Ok */
/* eslint-disable import/no-namespace -- Ok */

import * as config from "./src/config";

jest.mock("./src/config");

// @ts-expect-error
config.MONGODB_URI = `mongodb://127.0.0.1:${config.TEST_MONGODB_PORT}/`;
