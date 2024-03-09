import { drizzle } from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

export const db = drizzle(sql)
