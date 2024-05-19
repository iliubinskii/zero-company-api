/**
 * @type {import("eslint").Linter.Config }
 */
const config = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended"
  ],

  rules: {
    "@next/next/no-img-element": "off",
    "react/jsx-sort-props": "warn",
    "react/prop-types": "off",
    "react/self-closing-comp": "warn"
  },
  settings: { react: { version: "detect" } }
};

// eslint-disable-next-line import/no-commonjs -- Ok
module.exports = config;
