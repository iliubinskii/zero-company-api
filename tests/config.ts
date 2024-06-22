import { bool, cleanEnv, str } from "envalid";
import { config } from "dotenv";

config({ path: ".env.e2e" });

export const { BASE_URL, CI, JWT_ADMIN_EMAIL, JWT_EMAIL, JWT_SECRET } =
  // eslint-disable-next-line no-process-env -- Ok
  cleanEnv(process.env, {
    BASE_URL: str(),
    CI: bool({ default: false }),
    JWT_ADMIN_EMAIL: str(),
    JWT_EMAIL: str(),
    JWT_SECRET: str()
  });
