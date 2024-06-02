# Zero Company API

## Table of Contents

- [Initial Setup](#initial-setup)
- [Development](#development)
- [Contributions](#contributions)
- [How To](#how-to)

## Initial Setup

1. Clone the repository.
2. Git configuration for line breaks:
   - `git config core.autocrlf true`
   - `git config core.eol lf`
   - `git add --renormalize .`
3. Install dependencies by running `npm install`.
4. Create a `.env` file (see `.env.example`) or request `.env` file from the project owner.
5. Create a temp folder for multer (see `MULTER_DESTINATION_PATH` variable in `.env.example`).
6. Request access to postman collection if you need it for your part of work.

## Development

1. Start the development server by running `npm run dev`:
   - Server runs on [https://localhost:3000](https://localhost:3000).

## Recommended software

1. AI tools:
   - Copilot
   - ChatGPT 4o
2. Postman
3. SmartGit
4. VSCode
   - Configuration:
     - See `vscode.code-workspace` provided with the repo
   - Plugins:
     - ES6 String HTML (tobermory.es6-string-html)
     - ESLint (dbaeumer.vscode-eslint)
     - Fold on Open (prantlf.fold-on-open)
     - GitHub Copilot (github.copilot)
     - GitHub Copilot Chat (github.copilot-chat)
     - HTML CSS Support (ecmel.vscode-html-css)
     - Jest Runner (firsttris.vscode-jest-runner)
     - MarkdownLint (davidanson.vscode-markdownlint)
     - OpenAPI (Swagger) Editor (42crunch.vscode-openapi)
     - Prettier - Code formatter (esbenp.prettier-vscode)
     - Sort package.json (unional.vscode-sort-package-json)
     - Stylelint (stylelint.vscode-stylelint)
     - Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
     - YAML (redhat.vscode-yaml)
5. AI tools:
   - Copilot
   - ChatGPT 4o

## Contributions

1. Create a new feature branch `feature/<hyphened-branch-name>`.
2. Make your changes.
3. Format code by running `npm run format`.
4. Commit and push your changes.
5. Create a PR.

## How To

### Disable all checks for entire file

```javascript
/* eslint-disable eslint-comments/no-unlimited-disable -- Temp */
/* eslint-disable -- Temp */
// @ts-nocheck
```
