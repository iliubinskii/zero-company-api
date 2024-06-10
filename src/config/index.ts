/* eslint-disable no-process-env -- Ok */

import { bool, cleanEnv, makeValidator, num, str } from "envalid";
import { config } from "dotenv";

config();

const emailArray = makeValidator(input =>
  input
    .split(",")
    .filter(email => email.length)
    .map(email => email.trim().toLowerCase())
);

const sessionStoreProviderValidator = makeValidator<
  "memory" | "mongodb" | "redis"
>(input => {
  if (input === "memory" || input === "mongodb" || input === "redis")
    return input;

  throw new Error(`Invalid value for session store provider: ${input}`);
});

const env = cleanEnv(process.env, {
  ADMIN_EMAIL: emailArray(),
  AUTH0_CALLBACK_URL: str(),
  AUTH0_CLIENT_ID: str(),
  AUTH0_CLIENT_SECRET: str(),
  AUTH0_DOMAIN: str(),
  AUTH0_RETURN_URL: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  CLOUDINARY_BASE_FOLDER: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  COOKIE_DOMAIN: str(),
  COOKIE_SECURE: bool({ default: true }),
  CORS_ORIGIN: str(),
  ENV: str(),
  JWT_SECRET: str(),
  LOG_LEVEL: str({ default: "info" }),
  MONGODB_DATABASE_NAME: str(),
  MONGODB_URI: str(),
  MULTER_DESTINATION_PATH: str(),
  PORT: num({ default: 3000 }),
  REDIS_PREFIX: str(),
  REDIS_URL: str(),
  SESSION_SECRET: str(),
  SESSION_STORE_PROVIDER: sessionStoreProviderValidator({ default: "memory" }),
  TEST_MONGODB_PORT: num({ default: 27_017 })
});

export const {
  ADMIN_EMAIL,
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  AUTH0_RETURN_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_BASE_FOLDER,
  CLOUDINARY_CLOUD_NAME,
  COOKIE_DOMAIN,
  COOKIE_SECURE,
  CORS_ORIGIN,
  ENV,
  JWT_SECRET,
  LOG_LEVEL,
  MONGODB_DATABASE_NAME,
  MONGODB_URI,
  MULTER_DESTINATION_PATH,
  PORT,
  REDIS_PREFIX,
  REDIS_URL,
  SESSION_SECRET,
  SESSION_STORE_PROVIDER,
  TEST_MONGODB_PORT
} = env;
