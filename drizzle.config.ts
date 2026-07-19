import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env.local" })

//!  Drizzle Kit needs a singular, dedicated, unpooled pipe to lock the database, cleanly execute the raw Drizzle migrations safely from start to finish, and close out.

const migrationUrl =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL

if (!migrationUrl) {
  throw new Error(
    "DATABASE_URL_UNPOOLED (or DATABASE_URL) is not set in .env.local"
  )
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: migrationUrl,
  },
  casing: "snake_case",
  verbose: true,
  strict: true,
})
