/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  env: {
    es2020: true,
    jest: true
  },
  extends: ["./.eslintrc.base.cjs"],
  globals: { Express: true },
  ignorePatterns: ["!.*", "coverage/**", "dist/**", "node_modules/**"],
  overrides: [
    {
      files: "./src/schema/**",
      rules: {
        "import/no-relative-parent-imports": "warn"
      }
    },
    {
      files: ["./src/schema/routes.ts"],
      rules: {
        "no-magic-numbers": "off"
      }
    },
    {
      files: "./utils/**",
      rules: {
        "node/no-unpublished-import": "off"
      }
    }
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    project: "tsconfig.json",
    sourceType: "module"
  },
  rules: {
    "spellcheck/spell-checker": [
      "warn",
      {
        comments: true,
        identifiers: true,
        lang: "en_US",
        minLength: 3,
        skipWords:
          // @sort
          [
            "autofix",
            "camelcase",
            "cjs",
            "cloudinary",
            "commonjs",
            "consts",
            "cors",
            "defs",
            "destructure",
            "ecma",
            "enum",
            "escompat",
            "eslintrc",
            "etag",
            "filenames",
            "formatter",
            "fullsetup",
            "globals",
            "gmail",
            "ico",
            "jsdoc",
            "jsx",
            "lang",
            "langs",
            "lcfirst",
            "localhost",
            "logform",
            "mjs",
            "mongodb",
            "multer",
            "namespace",
            "nonnegative",
            "nullable",
            "num",
            "oid",
            "openapi",
            "openid",
            "originalname",
            "parens",
            "pem",
            "picsum",
            "printf",
            "readonly",
            "reconnectfailed",
            "redeclare",
            "req",
            "resave",
            "schemas",
            "serverless",
            "smacss",
            "sonarjs",
            "str",
            "stylelint",
            "stylelintrc",
            "tagline",
            "tsconfig",
            "tsx",
            "ttl",
            "ucfirst",
            "unlink",
            "uploader",
            "uri",
            "urls",
            "uuidv4",
            "ver",
            "vercel",
            "webhooks",
            "winston",
            "yaml",
            "zod"
          ],
        strings: true,
        templates: true
      }
    ],
    "unicorn/no-null": "off"
  }
};

// eslint-disable-next-line import/no-commonjs -- Ok
module.exports = config;
