/**
 * @type {import("jest").Config}
 */
const config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/*.d.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["lcov"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended/all", "./jest.setup.ts"],
  testEnvironment: "node"
};

export default config;
