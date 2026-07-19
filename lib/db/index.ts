// import { drizzle } from "drizzle-orm/node-postgres"
// import { Pool } from "pg"

// import * as schema from "@/lib/db/schema"

// const connectionString = process.env.DATABASE_URL

// if (!connectionString) {
//   throw new Error("DATABASE_URL is not set")
// }

// const globalForDb = globalThis as unknown as {
//   dbPool?: Pool
// }

// const pool =
//   globalForDb.dbPool ??
//   new Pool({
//     connectionString,
//     max: 5,
//   })

// if (process.env.NODE_ENV !== "production") {
//   globalForDb.dbPool = pool
// }

// export const db = drizzle({ client: pool, schema })

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

// Pooled HTTP connection — safe for serverless/edge and Next.js Server Components.
const sql = neon(process.env.DATABASE_URL)

export const db = drizzle({ client: sql, schema, casing: "snake_case" })

export { schema }
