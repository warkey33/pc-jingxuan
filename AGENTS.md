# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

This is a **Vue 2 frontend-only** SPA (JingXuan 精選 管理系統) built with Element UI. It connects to an external RuoYi-based Java backend at `http://localhost:8080` — the backend is **not** included in this repo.

### Node.js version

Use **Node 16** via nvm. Important: put the nvm binary first in `PATH`, because Cloud Agent shells may resolve `/exec-daemon/node` (Node 22) ahead of nvm:

```bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 16
export PATH="$NVM_DIR/versions/node/v16.20.2/bin:$PATH"
```

`@vue/cli-service@4.4.6` is incompatible with Node 18+.

### Common commands

| Task | Command |
|---|---|
| Install deps | `npm install` |
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Build (prod) | `npm run build:prod` |
| Build (staging) | `npm run build:stage` |

### Gotchas

- **ESLint**: `.eslintignore` ignores all `*.js` / `*.vue`, so `npm run lint` exits 2. Intentional.
- **Dev server port**: configured as 80; unprivileged environments fall back to **1024**.
- **Backend proxy**: `/dev-api/*` → `http://localhost:8080`. Without backend, captcha/login fail with `ECONNREFUSED` (expected for frontend-only work).
- **No lockfile**: pin critical deps (especially `vxe-table@3.8.16`) — newer 3.x pulls Vue3 peers (`@vxe-ui/core`).
- **UI reference**: visual language on `test` follows [Vue Vben Admin](https://github.com/vbenjs/vue-vben-admin) (deep navy sidebar, `#1A66FF` primary, light content surface).
