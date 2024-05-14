/**
 * @type {import("jest").Config}
 */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["lcov"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended/all"],
  testEnvironment: "node"
};

export default config;
