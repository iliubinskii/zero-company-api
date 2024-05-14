import version from "./version.json";

// Should not re-export the named export 'schemaVersion' directly from default-exporting module
export const schemaVersion = version.schemaVersion;

export * from "./auth";
export * from "./auth.validation";
export * from "./categories";
export * from "./categories.validation";
export * from "./common";
export * from "./companies";
export * from "./companies.validation";
export * from "./consts";
export * from "./get-all-options";
export * from "./get-all-options.validation";
export type { paths as Routes } from "./routes";
export * from "./routes-old";
export * from "./users";
export * from "./users.validation";
