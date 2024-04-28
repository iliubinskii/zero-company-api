/* eslint-disable no-process-env -- Ok */

import { assertDefined } from "../utils";
import { config } from "dotenv";

config();

export const CLOUDINARY_API_KEY = assertDefined(
  process.env["CLOUDINARY_API_KEY"]
);

export const CLOUDINARY_BASE_FOLDER = assertDefined(
  process.env["CLOUDINARY_BASE_FOLDER"]
);

export const CLOUDINARY_API_SECRET = assertDefined(
  process.env["CLOUDINARY_API_SECRET"]
);

export const CLOUDINARY_CLOUD_NAME = assertDefined(
  process.env["CLOUDINARY_CLOUD_NAME"]
);

export const JWT_SECRET = assertDefined(process.env["JWT_SECRET"]);

export const MONGODB_DATABASE_NAME = assertDefined(
  process.env["MONGODB_DATABASE_NAME"]
);

export const MONGODB_URI = assertDefined(process.env["MONGODB_URI"]);

export const MULTER_DESTINATION_PATH = assertDefined(
  process.env["MULTER_DESTINATION_PATH"]
);

export const PORT = assertDefined(process.env["PORT"]);
