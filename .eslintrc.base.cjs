/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  extends: [
    "eslint:recommended",
    "strict",
    "plugin:@typescript-eslint/strict",
    "plugin:deprecation/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:escompat/recommended",
    "plugin:etc/recommended",
    "plugin:github/recommended",
    "plugin:import/recommended",
    "plugin:jest-extended/all",
    "plugin:jsdoc/recommended",
    "plugin:no-use-extend-native/recommended",
    "plugin:node/recommended",
    "plugin:promise/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:regexp/recommended",
    "plugin:security/recommended-legacy",
    "plugin:sonarjs/recommended",
    "plugin:typescript-sort-keys/recommended",
    "plugin:unicorn/recommended",
    "plugin:prettier/recommended"
  ],
  overrides: [
    {
      files: "*.d.ts",
      rules: { "spaced-comment": "off" }
    },
    {
      files: ["*.test.ts", "*.test.tsx"],
      rules: {
        "i18n-text/no-en": "off"
      }
    }
  ],
  plugins: [
    "es",
    "no-type-assertion",
    "only-warn",
    "sort-annotation",
    "sort-destructure-keys",
    "sort-imports-requires",
    "spellcheck",
    "unused-imports"
  ],
  rules: {
    "callback-return": "off",
    "camelcase": "off",
    "consistent-return": "off",
    "default-case": "off",
    "dot-notation": "off",
    "eslint-comments/no-use": [
      "warn",
      { allow: ["eslint", "eslint-disable", "eslint-disable-next-line"] }
    ],
    "eslint-comments/require-description": "warn",
    "filenames/match-regex": "off",
    "id-blacklist": "off",
    "id-length": "off",
    "id-match": "off",
    "import/no-unresolved": "off",
    "jsdoc/require-param-type": "off",
    "jsdoc/require-returns-type": "off",
    "no-shadow": "off",
    "no-type-assertion/no-type-assertion": "warn",
    "no-undefined": "off",
    "no-underscore-dangle": "off",
    "no-unreachable": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "node/no-missing-import": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "avoid",
        endOfLine: "lf",
        quoteProps: "preserve",
        trailingComma: "none"
      }
    ],
    "quote-props": ["warn", "consistent-as-needed"],
    "react/jsx-sort-props": "warn",
    "sonarjs/prefer-immediate-return": "off",
    "sort-annotation/sort": "error",
    "sort-annotation/sort-keys": "error",
    "sort-destructure-keys/sort-destructure-keys": "warn",
    "sort-imports-requires/sort-imports": ["warn", { unsafeAutofix: true }],
    "sort-imports-requires/sort-requires": ["warn", { unsafeAutofix: true }],
    "sort-keys": "warn",
    "spellcheck/spell-checker": "warn",
    "unicorn/catch-error-name": ["warn", { name: "err" }],
    "unicorn/filename-case": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/prevent-abbreviations": "off",
    "unused-imports/no-unused-imports": "warn"
  },
  settings: { react: { version: "detect" } }
};

// eslint-disable-next-line import/no-commonjs -- Ok
module.exports = config;
