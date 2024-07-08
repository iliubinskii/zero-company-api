/* eslint-disable import/no-internal-modules -- Ok */
/* eslint-disable import/no-namespace -- Ok */

import * as config from "./src/config";
import { getMongodbMemoryServerUri } from "./utils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- Ok
// @ts-expect-error
config.MONGODB_URI = getMongodbMemoryServerUri();
