import { tasks } from "@trigger.dev/sdk"
import * as Sentry from "@sentry/node"

// Initialize Sentry for Trigger.dev task workers
Sentry.init({
  defaultIntegrations: false,
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV === "production" ? "production" : "development",
})

// Register a global onFailure hook to capture errors from any task
tasks.onFailure(({ payload, error, ctx }) => {
  Sentry.captureException(error, {
    extra: {
      payload,
      ctx,
    },
  })
})
