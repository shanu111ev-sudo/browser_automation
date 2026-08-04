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

# Stagehand Project

This is a project that uses Stagehand V3, a browser automation framework with AI-powered `act`, `extract`, `observe`, and `agent` methods.

The main class can be imported as `Stagehand` from `@browserbasehq/stagehand`.

**Key Classes:**

- `Stagehand`: Main orchestrator class providing `act`, `extract`, `observe`, and `agent` methods
- `context`: A `V3Context` object that manages browser contexts and pages
- `page`: Individual page objects accessed via `stagehand.context.pages()[i]` or created with `stagehand.context.newPage()`

## Initialize

```typescript
import { Stagehand } from "@browserbasehq/stagehand";

const stagehand = new Stagehand({
  env: "LOCAL", // or "BROWSERBASE"
  verbose: 2, // 0, 1, or 2
  model: "openai/gpt-4.1-mini", // or any supported model
});

await stagehand.init();

// Access the browser context and pages
const page = stagehand.context.pages()[0];
const context = stagehand.context;

// Create new pages if needed
const page2 = await stagehand.context.newPage();
```

## Act

Actions are called on the `stagehand` instance (not the page). Use atomic, specific instructions:

```typescript
// Act on the current active page
await stagehand.act("click the sign in button");

// Act on a specific page (when you need to target a page that isn't currently active)
await stagehand.act("click the sign in button", { page: page2 });
```

**Important:** Act instructions should be atomic and specific:

- ✅ Good: "Click the sign in button" or "Type 'hello' into the search input"
- ❌ Bad: "Order me pizza" or "Type in the search bar and hit enter" (multi-step)

### Observe + Act Pattern (Recommended)

Cache the results of `observe` to avoid unexpected DOM changes:

```typescript
const instruction = "Click the sign in button";

// Get candidate actions
const actions = await stagehand.observe(instruction);

// Execute the first action
await stagehand.act(actions[0]);
```

To target a specific page:

```typescript
const actions = await stagehand.observe("select blue as the favorite color", {
  page: page2,
});
await stagehand.act(actions[0], { page: page2 });
```

## Extract

Extract data from pages using natural language instructions. The `extract` method is called on the `stagehand` instance.

### Basic Extraction (with schema)

```typescript
import { z } from "zod";

// Extract with explicit schema
const data = await stagehand.extract(
  "extract all apartment listings with prices and addresses",
  z.object({
    listings: z.array(
      z.object({
        price: z.string(),
        address: z.string(),
      }),
    ),
  }),
);

console.log(data.listings);
```

### Simple Extraction (without schema)

```typescript
// Extract returns a default object with 'extraction' field
const result = await stagehand.extract("extract the sign in button text");

console.log(result);
// Output: { extraction: "Sign in" }

// Or destructure directly
const { extraction } = await stagehand.extract(
  "extract the sign in button text",
);
console.log(extraction); // "Sign in"
```

### Targeted Extraction

Extract data from a specific element using a selector:

```typescript
const reason = await stagehand.extract(
  "extract the reason why script injection fails",
  z.string(),
  { selector: "/html/body/div[2]/div[3]/iframe/html/body/p[2]" },
);
```

### URL Extraction

When extracting links or URLs, use `z.string().url()`:

```typescript
const { links } = await stagehand.extract(
  "extract all navigation links",
  z.object({
    links: z.array(z.string().url()),
  }),
);
```

### Extracting from a Specific Page

```typescript
// Extract from a specific page (when you need to target a page that isn't currently active)
const data = await stagehand.extract(
  "extract the placeholder text on the name field",
  { page: page2 },
);
```

## Observe

Plan actions before executing them. Returns an array of candidate actions:

```typescript
// Get candidate actions on the current active page
const [action] = await stagehand.observe("Click the sign in button");

// Execute the action
await stagehand.act(action);
```

Observing on a specific page:

```typescript
// Target a specific page (when you need to target a page that isn't currently active)
const actions = await stagehand.observe("find the next page button", {
  page: page2,
});
await stagehand.act(actions[0], { page: page2 });
```

## Agent

Use the `agent` method to autonomously execute complex, multi-step tasks.

### Basic Agent Usage

```typescript
const page = stagehand.context.pages()[0];
await page.goto("https://www.google.com");

const agent = stagehand.agent({
  model: "google/gemini-2.0-flash",
  executionModel: "google/gemini-2.0-flash",
});

const result = await agent.execute({
  instruction: "Search for the stock price of NVDA",
  maxSteps: 20,
});

console.log(result.message);
```

### Computer Use Agent (CUA)

For more advanced scenarios using computer-use models:

```typescript
const agent = stagehand.agent({
  mode: "cua", // Enable Computer Use Agent mode
  model: "anthropic/claude-sonnet-4-6",
  // or "google/gemini-2.5-computer-use-preview-10-2025"
  systemPrompt: `You are a helpful assistant that can use a web browser.
    Do not ask follow up questions, the user will trust your judgement.`,
});

await agent.execute({
  instruction: "Apply for a library card at the San Francisco Public Library",
  maxSteps: 30,
});
```

### Agent with Custom Model Configuration

```typescript
const agent = stagehand.agent({
  mode: "cua",
  model: {
    modelName: "google/gemini-2.5-computer-use-preview-10-2025",
    apiKey: process.env.GEMINI_API_KEY,
  },
  systemPrompt: `You are a helpful assistant.`,
});
```

### Agent with Integrations (MCP/External Tools)

```typescript
const agent = stagehand.agent({
  integrations: [`https://mcp.exa.ai/mcp?exaApiKey=${process.env.EXA_API_KEY}`],
  systemPrompt: `You have access to the Exa search tool.`,
});
```

## Advanced Features

### DeepLocator (XPath Targeting)

Target specific elements across shadow DOM and iframes:

```typescript
await page
  .deepLocator("/html/body/div[2]/div[3]/iframe/html/body/p")
  .highlight({
    durationMs: 5000,
    contentColor: { r: 255, g: 0, b: 0 },
  });
```

### Multi-Page Workflows

```typescript
const page1 = stagehand.context.pages()[0];
await page1.goto("https://example.com");

const page2 = await stagehand.context.newPage();
await page2.goto("https://example2.com");

// Act/extract/observe operate on the current active page by default
// Pass { page } option to target a specific page
await stagehand.act("click button", { page: page1 });
await stagehand.extract("get title", { page: page2 });
```