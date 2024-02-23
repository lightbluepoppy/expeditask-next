import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

export default {
  schema: "src/db/schema/schema.ts",
  out: "src/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URI!,
  },
} satisfies Config
