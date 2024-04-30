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
            "cors",
            "destructure",
            "ecma",
            "escompat",
            "eslintrc",
            "etag",
            "expressjwt",
            "filenames",
            "globals",
            "jsdoc",
            "jsx",
            "lang",
            "langs",
            "localhost",
            "mjs",
            "mongodb",
            "multer",
            "nonnegative",
            "oid",
            "openid",
            "originalname",
            "parens",
            "pem",
            "picsum",
            "req",
            "resave",
            "smacss",
            "sonarjs",
            "str",
            "stylelint",
            "stylelintrc",
            "tagline",
            "tsconfig",
            "tsx",
            "unlink",
            "uploader",
            "uri",
            "urls",
            "uuidv4",
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
