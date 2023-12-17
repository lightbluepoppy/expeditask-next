// pages/api/todo.js
import { db } from "backend/db/server"
import { tasks } from "backend/db/schema/schema"
import { eq } from "drizzle-orm"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const allTasks = await db.query.tasks()
        res.status(200).json(allTasks)
    }
}
