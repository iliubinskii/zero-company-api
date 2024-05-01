/* eslint-disable no-process-env -- Ok */

import { assertDefined } from "../utils";
import { config } from "dotenv";

config();

export const ENV = assertDefined(process.env["ENV"]);

export const PORT = assertDefined(process.env["PORT"]);

export const SECURE_PORT = assertDefined(process.env["SECURE_PORT"]);

export const ADMIN_EMAIL = assertDefined(process.env["ADMIN_EMAIL"])
  .split(",")
  .map(email => email.toLowerCase());

export const AUTH0_CALLBACK_URL = assertDefined(
  process.env["AUTH0_CALLBACK_URL"]
);

export const AUTH0_CLIENT_ID = assertDefined(process.env["AUTH0_CLIENT_ID"]);

export const AUTH0_CLIENT_SECRET = assertDefined(
  process.env["AUTH0_CLIENT_SECRET"]
);

export const AUTH0_DOMAIN = assertDefined(process.env["AUTH0_DOMAIN"]);

export const AUTH0_RETURN_URL = assertDefined(process.env["AUTH0_RETURN_URL"]);

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

export const COOKIE_DOMAIN = assertDefined(process.env["COOKIE_DOMAIN"]);

export const CORS_ORIGIN = assertDefined(process.env["CORS_ORIGIN"]);

export const JWT_SECRET = assertDefined(process.env["JWT_SECRET"]);

export const LOG_LEVEL = assertDefined(process.env["LOG_LEVEL"]);

export const MONGODB_DATABASE_NAME = assertDefined(
  process.env["MONGODB_DATABASE_NAME"]
);

export const MONGODB_URI = assertDefined(process.env["MONGODB_URI"]);

export const MULTER_DESTINATION_PATH = assertDefined(
  process.env["MULTER_DESTINATION_PATH"]
);

export const SESSION_SECRET = assertDefined(process.env["SESSION_SECRET"]);
