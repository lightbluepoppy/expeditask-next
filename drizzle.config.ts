import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

export default {
  schema: "src/db/schema/schema.ts",
  out: "src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config
