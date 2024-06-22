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
        "no-magic-numbers": "off",
        "typescript-sort-keys/interface": "off"
      }
    },
    {
      files: ["./tests/**", "./utils/**"],
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
    "import/no-internal-modules": [
      "warn",
      {
        allow:
          // @sort
          ["react-dom/server"]
      }
    ],
    "node/no-unsupported-features/es-builtins": [
      "error",
      {
        ignores: [],
        version: ">=20.0.0"
      }
    ],
    "node/no-unsupported-features/node-builtins": [
      "warn",
      {
        ignores: [],
        version: ">=20.0.0"
      }
    ],
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
            "bool",
            "builtins",
            "camelcase",
            "cjs",
            "cloudinary",
            "commonjs",
            "consts",
            "cors",
            "defs",
            "destructure",
            "docu",
            "docuseal",
            "ecma",
            "enum",
            "envalid",
            "escompat",
            "eslintrc",
            "etag",
            "filenames",
            "formatter",
            "fullsetup",
            "globals",
            "gmail",
            "goto",
            "ico",
            "jpg",
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
            "pdf",
            "pem",
            "picsum",
            "printf",
            "readonly",
            "reconnectfailed",
            "redeclare",
            "redis",
            "req",
            "resave",
            "schemas",
            "serverless",
            "smacss",
            "sonarjs",
            "str",
            "stylelint",
            "stylelintrc",
            "submitters",
            "tagline",
            "tsconfig",
            "tsx",
            "ttl",
            "txt",
            "ucfirst",
            "unlink",
            "uploader",
            "upsert",
            "uri",
            "urls",
            "utf8",
            "uuidv4",
            "validators",
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
