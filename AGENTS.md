<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run dev          # Next.js dev server
npm run lint         # eslint (flat config, next/core-web-vitals + typescript)
npm run typecheck    # tsc --noEmit
npm run format       # prettier --write "**/*.{ts,tsx}"
npm run build        # next build
npm run db:generate  # drizzle-kit generate (needs DATABASE_URL_UNPOOLED in .env.local)
npm run db:migrate   # drizzle-kit migrate
npm run db:push      # drizzle-kit push (dev convenience)
```

No pre-commit hooks or CI. Run `npm run lint && npm run typecheck` before any commit.

## Architecture

- **Next.js 16** app router with route groups: `(auth)` and `(dashboard)` — the parens are URL-invisible.
- **Clerk** for auth (`@clerk/nextjs`). Root layout wraps `ClerkProvider`. All routes are protected except `/sign-in` and `/sign-up`.
- **Neon** Postgres via `@neondatabase/serverless` (HTTP driver, not pooled). Schema at `lib/db/schema.ts`, migrations at `lib/db/migrations/`.
- **Drizzle ORM** for queries. `casing: "snake_case"` is configured — camelCase fields auto-map to snake_case columns.
- **Trigger.dev v4** for background tasks. Tasks live in `trigger/` dir only (`trigger.config.ts` sets `dirs: ["trigger"]`).
- **ReactFlow v12** (`@xyflow/react`) for the workflow canvas.
- **shadcn** (radix-nova style, `@shadcn/react` + `@base-ui/react`). Add components with `npx shadcn@latest add <name>`. Components land in `components/ui/`.

### Key directories

| Path | Purpose |
|------|---------|
| `app/` | Next.js pages and layouts |
| `features/workflows/` | Workflow domain: actions, data queries, canvas, sidebar |
| `lib/db/` | Drizzle schema, migrations, Neon DB connection |
| `trigger/` | Trigger.dev background tasks |
| `components/ui/` | shadcn/ui components |
| `design/` | Static reference screenshots (PNGs) |
| `specs/` | Design specifications |
| `.agents/skills/` | Agent skills (Clerk, Neon, Trigger.dev) |

### Routes

| URL | Page |
|-----|------|
| `/` | Empty dashboard state |
| `/sign-in/*` | Clerk sign-in |
| `/sign-up/*` | Clerk sign-up |
| `/choose-organization` | Clerk org chooser |
| `/workflows/[id]` | Workflow editor (`WorkflowShell`) |

## Gotchas

- **Database types**: Always derive from Drizzle schema at `lib/db/schema.ts`. Export `typeof table.$inferSelect`. Do NOT hand-write row types. (Note: the path is `lib/db/schema`, NOT `lib/schema`.)
- **JSX escaping**: Apostrophes and quotes in JSX text trip `react/no-unescaped-entities`. Use `&apos;` and `&quot;` in literal text between tags.
- **Browserbase observability**: Session replay uses the core Browserbase SDK (`@browserbasehq/sdk`), not Stagehand. Session replay requires the secret API key, so it must be proxied server-side. Docs: https://docs.browserbase.com/platform/browser/observability/session-replay
- **Workflow nodes**: The node system (`features/workflows/nodes/`) is not yet implemented. When it is, adding a node means: (1) an impl file, (2) register in `node-executors.ts`, (3) add manifest in `node-registry.ts`. Do not touch the run task or canvas step node.
- **ReactFlow — do not trust training data**: This project uses ReactFlow (`@xyflow/react`). Its APIs, components, hooks, and props change across versions and may differ from your training data. Before writing or changing **any** ReactFlow code, fetch and consult the official LLM docs index at https://reactflow.dev/llms.txt and follow the linked pages relevant to what you're building. Do not rely on memory for component names, props, hook signatures, or usage patterns.
- **Stagehand**: This project uses Stagehand V3. The main import is `Stagehand` from `@browserbasehq/stagehand`. For full API reference, see the Stagehand docs — the key methods are `act`, `extract`, `observe`, and `agent`.
- **Trigger.dev skills**: Before writing Trigger.dev code (background tasks, chat agents, realtime hooks), load the relevant skill from `.agents/skills/` via the skill tool. Available: `trigger-authoring-tasks`, `trigger-authoring-chat-agent`, `trigger-chat-agent-advanced`, `trigger-realtime-and-frontend`, `trigger-cost-savings`, `trigger-getting-started`.
- **`.env.local`**: Contains Clerk keys, Neon database URLs, and Trigger.dev secret key. Do not commit. No `OPENAI_API_KEY` or `BROWSERBASE_API_KEY` present.
