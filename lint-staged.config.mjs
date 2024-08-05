/**
 * @type {import('lint-staged').Config}
 */
const config = {
  "*.{cjs,cjsx,js,jsx,mjs,mjsx,ts,tsx}": "eslint --max-warnings=0",
  "*.{css,html,json,less,postcss,scss}": "prettier --log-level warn --write",
  "*.md": "markdownlint"
};

export default config;
