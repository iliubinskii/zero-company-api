/**
 * @type {import('lint-staged').Config}
 */
const config = {
  "*.{cjs,js,mjs,jsx,ts,tsx}": "eslint --max-warnings=0",
  "*.{css,html,json,less,postcss,scss}": "prettier --write",
  "*.md": "markdownlint"
};

export default config;
