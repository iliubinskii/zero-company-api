/* eslint-disable no-sync -- Ok */

import fs from "node:fs";

const favicon = fs.readFileSync("public/favicon.ico").toString("base64");

fs.writeFileSync("src/public/favicon.json", JSON.stringify({ favicon }));
