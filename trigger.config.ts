import { defineConfig } from "@trigger.dev/sdk"
import { esbuildPlugin } from "@trigger.dev/build/extensions"
import { sentryEsbuildPlugin } from "@sentry/esbuild-plugin"

export default defineConfig({
  project: "proj_plfuiftnpxngszhytfsx",
  runtime: "node",
  logLevel: "log",
  // The max compute seconds a task is allowed to run. If the task run exceeds this duration, it will be stopped.
  // You can override this on an individual task.
  // See https://trigger.dev/docs/runs/max-duration
  maxDuration: 3600,
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  // `trigger/` for init + example tasks; `features/` for domain tasks (e.g. run-workflow).
  dirs: ["trigger", "features"],
  build: {
    extensions: [
      esbuildPlugin(
        sentryEsbuildPlugin({
          org: "somanth",
          project: "browser-auto",
          // Find this auth token in Sentry → Settings → Developer Settings → Auth Tokens
          authToken: process.env.SENTRY_AUTH_TOKEN,
        }),
        { placement: "last", target: "deploy" }
      ),
    ],
  },
})
