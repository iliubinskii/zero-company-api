/* eslint import/no-extraneous-dependencies: ["warn", { "devDependencies": true }] -- Ok */

import { BASE_URL, CI } from "./tests";
import { defineConfig, devices } from "@playwright/test";

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
    baseURL: BASE_URL,
    trace: "on-first-retry"
  },
  workers: CI ? 1 : 2
});
