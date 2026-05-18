# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

This is a **Vue 2 frontend-only** SPA (JingXuan 精選 管理系統) built with Element UI. It connects to an external RuoYi-based Java backend at `http://localhost:8080` — the backend is **not** included in this repo.

### Node.js version

Use **Node 16** (via `nvm use 16`). The project uses `@vue/cli-service@4.4.6` which is incompatible with Node 18+. Node 16 is pre-installed via `nvm install 16`.

### Common commands

| Task | Command |
|---|---|
| Install deps | `npm install` |
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Build (prod) | `npm run build:prod` |
| Build (staging) | `npm run build:stage` |

### Gotchas

- **ESLint**: The `.eslintignore` file ignores all `*.js` and `*.vue` files, so `npm run lint` exits with code 2 (no files to lint). This is intentional project configuration.
- **Dev server port**: Configured as port 80 in `vue.config.js`, but in unprivileged environments it falls back to port **1024**. Check the terminal output for the actual port.
- **Backend proxy**: The dev server proxies `/dev-api/*` requests to `http://localhost:8080`. Without the backend, API calls (login, captcha, etc.) will fail with `ECONNREFUSED` — this is expected for frontend-only development.
- **No lockfile**: The repo has no `package-lock.json` or `yarn.lock`. Dependency versions float within their semver ranges.
