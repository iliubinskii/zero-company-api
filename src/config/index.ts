/* eslint-disable no-process-env -- Ok */

import { preprocessBoolean, preprocessEmail } from "../schema";
import { assertDefined } from "../utils";
import { config } from "dotenv";
import zod from "zod";

const BooleanValidationSchema = preprocessBoolean(zod.boolean());

const EmailValidationSchema = preprocessEmail(zod.string().email());

const StringValidationSchema = preprocessBoolean(zod.string().min(1));

config();

export const ENV = StringValidationSchema.parse(process.env["ENV"]);

export const PORT = StringValidationSchema.parse(process.env["PORT"]);

export const ADMIN_EMAIL = assertDefined(process.env["ADMIN_EMAIL"])
  .split(",")
  .filter(email => email.length)
  .map(email => EmailValidationSchema.parse(email));

export const AUTH0_CALLBACK_URL = StringValidationSchema.parse(
  process.env["AUTH0_CALLBACK_URL"]
);

export const AUTH0_CLIENT_ID = StringValidationSchema.parse(
  process.env["AUTH0_CLIENT_ID"]
);

export const AUTH0_CLIENT_SECRET = StringValidationSchema.parse(
  process.env["AUTH0_CLIENT_SECRET"]
);

export const AUTH0_DOMAIN = StringValidationSchema.parse(
  process.env["AUTH0_DOMAIN"]
);

export const AUTH0_RETURN_URL = StringValidationSchema.parse(
  process.env["AUTH0_RETURN_URL"]
);

export const CLOUDINARY_API_KEY = StringValidationSchema.parse(
  process.env["CLOUDINARY_API_KEY"]
);

export const CLOUDINARY_BASE_FOLDER = StringValidationSchema.parse(
  process.env["CLOUDINARY_BASE_FOLDER"]
);

export const CLOUDINARY_API_SECRET = StringValidationSchema.parse(
  process.env["CLOUDINARY_API_SECRET"]
);

export const CLOUDINARY_CLOUD_NAME = StringValidationSchema.parse(
  process.env["CLOUDINARY_CLOUD_NAME"]
);

export const COOKIE_DOMAIN = StringValidationSchema.parse(
  process.env["COOKIE_DOMAIN"]
);

export const COOKIE_SECURE = BooleanValidationSchema.parse(
  process.env["COOKIE_SECURE"]
);

export const CORS_ORIGIN = StringValidationSchema.parse(
  process.env["CORS_ORIGIN"]
);

export const JWT_SECRET = StringValidationSchema.parse(
  process.env["JWT_SECRET"]
);

export const LOG_LEVEL = StringValidationSchema.parse(process.env["LOG_LEVEL"]);

export const MONGODB_DATABASE_NAME = StringValidationSchema.parse(
  process.env["MONGODB_DATABASE_NAME"]
);

export const MONGODB_URI = StringValidationSchema.parse(
  process.env["MONGODB_URI"]
);

export const MULTER_DESTINATION_PATH = StringValidationSchema.parse(
  process.env["MULTER_DESTINATION_PATH"]
);

export const SESSION_SECRET = StringValidationSchema.parse(
  process.env["SESSION_SECRET"]
);
