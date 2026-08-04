import { task } from "@trigger.dev/sdk"

/**
 * Temporary task to verify Trigger.dev → Sentry error reporting.
 * Run from the Trigger.dev dashboard (Test), then delete when confirmed.
 */
export const sentryErrorTest = task({
  id: "sentry-error-test",
  retry: {
    maxAttempts: 1,
  },
  run: async () => {
    throw new Error("This is a custom error that Sentry will capture", {
      cause: { additionalContext: "This is additional context" },
    })
  },
})
