/* eslint-disable node/no-unpublished-import -- Ok */

import { bool, cleanEnv } from "envalid";
import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

config();

// eslint-disable-next-line no-process-env -- Ok
const { CI } = cleanEnv(process.env, {
  CI: bool({ default: false })
});

export default defineConfig({
  forbidOnly: CI,
  fullyParallel: true,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ],
  reporter: "html",
  retries: CI ? 2 : 0,
  testDir: "./tests",
  use: {
    baseURL: "https://preview-api.zero-company.app/",
    trace: "on-first-retry"
  },
  workers: CI ? 1 : 2
});
