/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  extends: [
    "eslint:recommended",
    "strict",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:eslint-comments/recommended",
    "plugin:escompat/recommended",
    "plugin:etc/recommended",
    "plugin:github/recommended",
    "plugin:import/recommended",
    "plugin:jest-extended/all",
    "plugin:jsdoc/recommended",
    "plugin:n/recommended",
    "plugin:no-use-extend-native/recommended",
    "plugin:node/recommended",
    "plugin:promise/recommended",
    "plugin:regexp/recommended",
    "plugin:security/recommended-legacy",
    "plugin:sonarjs/recommended",
    "plugin:sort/recommended",
    "plugin:typescript-sort-keys/recommended",
    "plugin:unicorn/recommended",
    "plugin:prettier/recommended"
  ],
  overrides: [
    {
      files: "*.d.ts",
      rules: {
        "spaced-comment": "off"
      }
    },
    {
      files: ["*.test.ts", "*.test.tsx"],
      rules: {
        "i18n-text/no-en": "off",
        "no-magic-numbers": "off",
        "node/no-unpublished-import": "off"
      }
    }
  ],
  plugins: [
    "es",
    "no-type-assertion",
    "only-warn",
    "sort-annotation",
    "sort-imports-requires",
    "spellcheck",
    "unused-imports"
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        disallowTypeAnnotations: false,
        prefer: "type-imports"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        allowDirectConstAssertionInArrowFunctions: true,
        allowExpressions: true,
        allowFunctionsWithoutTypeParameters: false,
        allowHigherOrderFunctions: true,
        allowIIFEs: false,
        allowTypedFunctionExpressions: true,
        allowedNames: []
      }
    ],
    "@typescript-eslint/no-dynamic-delete": "off",
    "@typescript-eslint/no-shadow": "warn",
    "@typescript-eslint/restrict-template-expressions": [
      "warn",
      { allowNumber: true }
    ],
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
    "arrow-body-style": [
      "error",
      "as-needed",
      { requireReturnForObjectLiteral: true }
    ],
    "callback-return": "off",
    "camelcase": "off",
    "consistent-return": "off",
    "curly": ["warn", "multi"],
    "default-case": "off",
    "dot-notation": "off",
    "eslint-comments/no-use": [
      "warn",
      { allow: ["eslint", "eslint-disable", "eslint-disable-next-line"] }
    ],
    "eslint-comments/require-description": "warn",
    "etc/no-deprecated": "off",
    "etc/no-implicit-any-catch": "off",
    "filenames/match-regex": "off",
    "id-blacklist": "off",
    "id-length": "off",
    "id-match": "off",
    "import/named": "off",
    "import/no-internal-modules": "warn",
    "import/no-self-import": "warn",
    "import/no-unresolved": "off",
    "init-declarations": "off",
    "jsdoc/require-param-type": "off",
    "jsdoc/require-returns-type": "off",
    "n/no-missing-import": "off",
    "no-duplicate-imports": "off",
    "no-magic-numbers": ["error", { ignore: [-1, 0, 0.5, 1, 2, 100] }],
    "no-redeclare": "off",
    "no-shadow": "off",
    "no-type-assertion/no-type-assertion": "warn",
    "no-undefined": "off",
    "no-underscore-dangle": "off",
    "no-unreachable": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "node/no-missing-import": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "prefer-destructuring": "off",
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "avoid",
        endOfLine: "lf",
        quoteProps: "preserve",
        trailingComma: "none"
      }
    ],
    "promise/always-return": "off",
    "quote-props": ["warn", "consistent-as-needed"],
    "quotes": ["error", "double"],
    "security/detect-object-injection": "off",
    "sonarjs/no-duplicate-string": "off",
    "sonarjs/prefer-immediate-return": "off",
    "sort/destructuring-properties": [
      "warn",
      { caseSensitive: true, natural: true }
    ],
    "sort/exports": [
      "warn",
      {
        caseSensitive: true,
        groups: [],
        natural: true,
        typeOrder: "last"
      }
    ],
    "sort/import-members": "off",
    "sort/imports": "off",
    "sort/object-properties": ["warn", { caseSensitive: true, natural: true }],
    "sort-annotation/sort": "warn",
    "sort-annotation/sort-keys": "warn",
    "sort-imports-requires/sort-imports": ["warn", { unsafeAutofix: true }],
    "sort-imports-requires/sort-requires": ["warn", { unsafeAutofix: true }],
    "spellcheck/spell-checker": "warn",
    "unicorn/catch-error-name": ["warn", { name: "err" }],
    "unicorn/consistent-function-scoping": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-unnecessary-polyfills": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/prefer-logical-operator-over-ternary": "off",
    "unicorn/prefer-regexp-test": "off",
    "unicorn/prefer-top-level-await": "off",
    "unicorn/prevent-abbreviations": "off",
    "unused-imports/no-unused-imports": "warn"
  }
};

// eslint-disable-next-line import/no-commonjs -- Ok
module.exports = config;
