"use strict";
/* eslint-disable no-process-env -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const utils_1 = require("../utils");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = (0, utils_1.assertDefined)(process.env["PORT"]);
//# sourceMappingURL=index.js.map