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
  ignorePatterns: ["!.*", "coverage/**", "node_modules/**"],
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
            "cjs",
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
            "parens",
            "req",
            "smacss",
            "sonarjs",
            "stylelint",
            "stylelintrc",
            "tsconfig",
            "tsx"
          ],
        strings: true,
        templates: true
      }
    ],
    "unicorn/prevent-abbreviations": [
      "warn",
      { allowList: { req: true, res: true } }
    ]
  }
};

// eslint-disable-next-line import/no-commonjs -- Ok
module.exports = config;
