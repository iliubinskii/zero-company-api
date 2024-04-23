/**
 * @type {import("jest").Config}
 */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["jest-extended/all"]
};

export default config;
