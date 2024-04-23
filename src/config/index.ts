/* eslint-disable no-process-env -- Ok */

import { assertDefined } from "../utils";
import { config } from "dotenv";

config();

export const PORT = assertDefined(process.env["PORT"]);
