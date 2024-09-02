/**
 * @type {import("eslint").Linter.Config}
 */
const config = {
  ignorePatterns: [
    "!.*",
    "coverage/**",
    "node_modules/**",
    "playwright-report/**",
    "test-results/**"
  ],
  env: {
    es2020: true
  },
  globals: {
    Express: "readonly"
  },
  extends: "union",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    project: "tsconfig.json",
    sourceType: "module"
  },
  rules: {
    "@cspell/spellchecker": [
      "warn",
      {
        cspell: {
          words:
            // @sorted
            [
              "cjsx",
              "csstools",
              "docuseal",
              "fullsetup",
              "hsts",
              "lcfirst",
              "logform",
              "mjsx",
              "packagejson",
              "picsum",
              "preprocesses",
              "reconnectfailed",
              "resave",
              "smacss",
              "ucfirst"
            ]
        }
      }
    ],
    "import/no-internal-modules": ["warn", { allow: ["react-dom/server"] }],
    "misc/consistent-optional-props": [
      "warn",
      { classes: "combined", interfaces: "combined" }
    ],
    "misc/typescript/no-unsafe-object-assignment": "off",
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
        "jsdoc/require-description-complete-sentence": "off",
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
        "@typescript-eslint/no-unsafe-member-access": "off"
      }
    }
  ]
};

module.exports = config;
