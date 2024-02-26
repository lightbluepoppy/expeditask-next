import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database"
import * as schema from "src/db/schema/schema"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

export const connection = connect({
  url: process.env.DATABASE_URI,
})

export const db = drizzle(connection, { schema })
