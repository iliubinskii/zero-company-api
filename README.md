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
4. Create a `.env` file (see `.env.example`).

## Development

1. Start the development server by running `npm run dev`:
   - Server runs on [https://localhost:3000](https://localhost:3000).

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
