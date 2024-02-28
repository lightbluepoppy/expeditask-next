import { drizzle } from "drizzle-orm/planetscale-serverless"
import { Client } from "@planetscale/database"
import * as schema from "src/db/schema/schema"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

export const connection = new Client({
  url: process.env.DATABASE_URI,
})

export const db = drizzle(connection, { schema })
