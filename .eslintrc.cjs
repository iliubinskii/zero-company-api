/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  ignorePatterns: ["!.*", "coverage/**", "dist/**", "node_modules/**"],
  env: { es2020: true },
  globals: { Express: true },
  extends: ["./.eslintrc.base.cjs", "./.eslintrc.spellcheck.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    project: "tsconfig.json",
    sourceType: "module"
  },
  rules: {
    "import/no-internal-modules": ["warn", { allow: ["react-dom/server"] }],
    "misc/consistent-optional-props": [
      "warn",
      { classes: "combined", interfaces: "combined" }
    ],
    "misc/typescript/no-unsafe-object-assignment": "off",
    "node/no-unsupported-features/es-builtins": [
      "error",
      { ignores: [], version: ">=20.0.0" }
    ],
    "node/no-unsupported-features/node-builtins": [
      "warn",
      { ignores: [], version: ">=20.0.0" }
    ],
    "unicorn/no-null": "off"
  },
  overrides: [
    {
      files: "./src/schema/**",
      rules: { "import/no-relative-parent-imports": "warn" }
    },
    {
      files: "./src/schema/routes.ts",
      rules: {
        "misc/comment-spacing": "off",
        "misc/typescript/no-never": "off",
        "misc/typescript/prefer-readonly-array": "off",
        "misc/typescript/prefer-readonly-property": "off",
        "no-magic-numbers": "off",
        "typescript-sort-keys/interface": "off"
      }
    },
    {
      files: "./tests/**",
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "node/no-unpublished-import": "off"
      }
    },
    { files: "./utils/**", rules: { "node/no-unpublished-import": "off" } }
  ]
};

module.exports = config;
