/**
 * @type {import("jest").Config}
 */
const config = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/*.d.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["lcov"],
  globalSetup: "./jest.global-setup.ts",
  globalTeardown: "./jest.global-teardown.ts",
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended/all", "./jest.setup-after-env.ts"],
  testEnvironment: "node"
};

export default config;
