// pages/api/todo.js
import { db } from "src/db/server"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const allTasks = await db.query.events()
    res.status(200).json(allTasks)
  }
}
