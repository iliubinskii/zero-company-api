/* eslint-disable no-sync -- Ok */

import { PORT, SECURE_PORT, createApp, lang, logger } from "../src";
import fs from "node:fs";
import http from "node:http";
import https from "node:https";

const app = createApp();

const httpsOptions = {
  cert: fs.readFileSync("./certificates/localhost.pem"),
  key: fs.readFileSync("./certificates/localhost-key.pem")
} as const;

http.createServer(app).listen(PORT, () => {
  logger.info(lang.ServerStarted);
});

https.createServer(httpsOptions, app).listen(SECURE_PORT, () => {
  logger.info(lang.SecureServerStarted);
});
