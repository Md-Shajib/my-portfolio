@AGENTS.md

# Working in this repo

This is **Next.js 16** + **React 19** + **Tailwind v4**. APIs differ meaningfully from older versions you may have seen. Before writing any Next-specific code, read the relevant guide in `node_modules/next/dist/docs/01-app/`.

## Hard rules

1. **Always read the local docs first.** `node_modules/next/dist/docs/01-app/01-getting-started/` for fundamentals; `node_modules/next/dist/docs/01-app/02-guides/` for specific topics. Heed deprecation notices and AI-agent hints.
2. **`params` and `searchParams` are Promises.** Use `const { slug } = await params`.
3. **Use generated route prop helpers.** `PageProps<'/blog/[slug]'>` and `LayoutProps<'/dashboard'>` are global — no imports.
4. **Request interception lives in `proxy.ts`** (root), not `middleware.ts`.
5. **Route handlers are not cached by default.** Opt in with `export const dynamic = 'force-static'` or `use cache`.
6. **Turbopack + MDX:** remark/rehype plugins must be passed as strings (functions cannot cross the JS↔Rust boundary).
7. **Do not invent APIs.** If unsure, grep `node_modules/next/dist/docs/` first.

## Project conventions

- App routes live under `/app/[locale]/...` (root `/app`, **not** `/src/app`).
- Path alias `@/*` → `./*`.
- Tailwind v4 with `@import "tailwindcss"` and `@theme inline { ... }` in `app/globals.css`.
- 5 accent palettes (emerald, violet, amber, sky, rose) toggled via `data-accent` on `:root`.
- Locales: `en` (default), `bn`. Bangla uses Hind Siliguri via `next/font/google`.
- Content: MDX in `/content/{projects,posts}/{slug}.{en,bn}.mdx` with EN fallback.
- Per-module workflow: polish (lint+format) → test (build) → commit (Conventional Commits) → push.

## Commit style

Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`, `perf:`, `build:`, `ci:`. Co-authored trailer `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
