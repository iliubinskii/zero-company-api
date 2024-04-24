/* eslint-disable filenames/match-regex -- Ok */

/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  env: {
    es2020: true,
    jest: true
  },
  extends: ["./.eslintrc.base.cjs"],
  globals: {},
  ignorePatterns: ["!.*", "coverage/**", "dist/**", "node_modules/**"],
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
            "destructure",
            "ecma",
            "escompat",
            "eslintrc",
            "filenames",
            "globals",
            "jsdoc",
            "jsx",
            "lang",
            "langs",
            "mjs",
            "mongodb",
            "multer",
            "originalname",
            "parens",
            "req",
            "smacss",
            "sonarjs",
            "stylelint",
            "stylelintrc",
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
    ]
  }
};

// eslint-disable-next-line import/no-commonjs -- Ok
module.exports = config;
