"use strict";
/* eslint-disable no-process-env -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MULTER_DESTINATION_PATH = exports.MONGODB_URI = exports.MONGODB_DATABASE_NAME = exports.CLOUDINARY_CLOUD_NAME = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_BASE_FOLDER = exports.CLOUDINARY_API_KEY = void 0;
const utils_1 = require("../utils");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.CLOUDINARY_API_KEY = (0, utils_1.assertDefined)(process.env["CLOUDINARY_API_KEY"]);
exports.CLOUDINARY_BASE_FOLDER = (0, utils_1.assertDefined)(process.env["CLOUDINARY_BASE_FOLDER"]);
exports.CLOUDINARY_API_SECRET = (0, utils_1.assertDefined)(process.env["CLOUDINARY_API_SECRET"]);
exports.CLOUDINARY_CLOUD_NAME = (0, utils_1.assertDefined)(process.env["CLOUDINARY_CLOUD_NAME"]);
exports.MONGODB_DATABASE_NAME = (0, utils_1.assertDefined)(process.env["MONGODB_DATABASE_NAME"]);
exports.MONGODB_URI = (0, utils_1.assertDefined)(process.env["MONGODB_URI"]);
exports.MULTER_DESTINATION_PATH = (0, utils_1.assertDefined)(process.env["MULTER_DESTINATION_PATH"]);
exports.PORT = (0, utils_1.assertDefined)(process.env["PORT"]);
//# sourceMappingURL=index.js.map