// server.ts
// import "dotenv/config"
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database"
import * as schema from "backend/db/schema/schema"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

export const connection = connect({
    // host: process.env.DATABASE_HOST,
    // username: process.env.DATABASE_USERNAME,
    // password: process.env.DATABASE_PASSWORD,
    // url: process.env.DATABASE_URI!,
    url: `mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?ssl={"rejectUnauthorized":true}`,
})

export const db = drizzle(connection, { schema })
