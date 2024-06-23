/* eslint-disable @typescript-eslint/ban-ts-comment -- Ok */
/* eslint-disable import/no-internal-modules -- Ok */
/* eslint-disable import/no-namespace -- Ok */

import * as config from "./src/config";
import { getMongodbMemoryServerUri } from "./utils";

// @ts-expect-error
config.MONGODB_URI = getMongodbMemoryServerUri();
