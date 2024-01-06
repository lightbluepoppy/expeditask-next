//drizzle.config.ts
import type { Config } from "drizzle-kit"
// import "dotenv/config"
// require("dotenv").config({ path: "./.env.local" })
import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

export default {
    schema: "backend/db/schema/schema.ts",
    out: "backend/db/migrations",
    driver: "mysql2",
    dbCredentials: {
        // host: process.env.DATABASE_HOST!,
        // user: process.env.DATABASE_USERNAME!,
        // password: process.env.DATABASE_PASSWORD!,
        // database: process.env.DATABASE_NAME!,
        // uri: process.env.DATABASE_URI || "",
        uri: `mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?ssl={"rejectUnauthorized":true}`,
    },
} satisfies Config
