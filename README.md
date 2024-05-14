# Zero Company API

## Initial setup

1. Clone repository.
2. Git configuration for line breaks:
   - git config core.autocrlf true
   - git config core.eol lf
   - git add --renormalize .
3. Install dependencies by running `npm install`.
4. Create .env file (see .env.example)
5. Add SSL certificates or copy certificates generated in zero-company-app repo
   - certificates/localhost.pem
   - certificates/localhost-key.pem

## Development

1. Start development server by running `npm run dev`
2. HTTPS server runs on https://localhost:3000 (see .env.example)
3. HTTP server runs on http://localhost:3000 (see .env.example)

## Contributions

1. Create a new feature branch `feature/<hyphened-branch-name>`.
2. Make your changes.
3. Format code by running `npm run format`.
4. Commit and push your changes (commit should pass validation).
5. Create a PR.

## How To

### Disable all checks for entire file

```
/* eslint-disable eslint-comments/no-unlimited-disable -- Temp */
/* eslint-disable -- Temp */
// @ts-nocheck
```

## TODO

- Add authors in package.json
- Decide whether repo is private or public
