# TODO: project name

> **First session:** the TODOs below are still open. Ask the owner what is unclear, fill them
> in, delete this note and open a PR. Keep this file under 60 lines. Tools, MCPs and box rules
> are in the global box CLAUDE.md, don't repeat them here.

## Purpose
TODO: what this app is, for whom, and the production URL.

## Stack
Next.js 15 (App Router), React 19, TypeScript (strict), ESLint, Vitest. Runs as the standalone
server (`output: 'standalone'`). The demo has no database and no auth. TODO: add what the project
needs (Tailwind, Drizzle/Prisma + DB, Clerk/Auth.js, ...) and list it here.

## Commands
- Install: `npm ci` (add packages with `npm install --save-exact`, commit `package-lock.json`)
- Dev server: `npm run dev` (already listens on 0.0.0.0:8080 so `dev expose` works)
- Lint + types: `npm run lint` (ESLint and `tsc --noEmit`)
- Tests: `npm test` (Vitest, files `*.test.ts` next to the code)
- Build: `npm run build`, run the result with `node .next/standalone/server.js`

## Layout
- `app/`: routes. `app/healthz/route.ts` and `app/version.txt/route.ts` are the deploy contract.
- `lib/`: plain TypeScript helpers with tests. `public/`: static files.
- `Dockerfile`: multi-stage build of the standalone server.

## Demo content
`app/page.tsx`, `app/layout.tsx`, `app/globals.css` and `lib/version.ts` are a placeholder
(keep `lib/version.ts` and the two contract routes). Replace the rest and delete this section.

## CI and deploy contract
`.github/workflows/ci.yml` is a thin caller of the shared pipeline in `seitenschwung/template`,
managed by the owner. You can't change workflow files, so build the project to fit it:
- With `package-lock.json`, CI runs `npm ci`, `npm run lint`, `npm test` and `npm run build`.
  Keep them green locally before pushing.
- CI builds the Dockerfile and runs the image hardened: read-only root filesystem, `/tmp` as the
  only writable path, no capabilities, non-root user. So no runtime writes: no ISR/image-optimizer
  cache (`images.unoptimized` is set), no `next start` file output. If you need a cache, point it at `/tmp`.
- It must listen on port **8080**, answer `GET /healthz` with 200 and serve `GET /version.txt`
  with the build argument `APP_VERSION` (the commit SHA, read at request time).
- `/` is crawled in real browsers: axe (WCAG AA, serious/critical fail) and Lighthouse (accessibility,
  best practices, SEO at least 90). Keep `<html lang>`, a title, a meta description and alt texts.
- `docker-compose.yml` keeps the CrowdSec labels (`crowdsec.enable=true`,
  `crowdsec.labels.type=http`) and the json-file log rotation on every service that serves traffic.
  The CrowdSec agent on the server reads the container logs through them. Don't remove them; the
  type must match a parser there, so ask the owner before changing it.
- `docker-compose.yml` is what Coolify runs. Keep `image: ${IMAGE}`. `main` is production: every
  merge deploys after green CI. Work on branches, open PRs.

## Conventions
- Server Components by default; add `'use client'` only where state or browser APIs are needed.
- Co-locate by feature, import with the `@/` alias, no default exports except where Next requires them.
- Conventional Commits (`feat:`, `fix:`, `chore:`).
- TODO: language of the UI, design system, anything the owner insists on.
