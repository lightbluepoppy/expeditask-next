import * as schema from "backend/db/schema/schema"
import { drizzle } from "drizzle-orm/planetscale-serverless"

import { db } from "backend/db/server"
import { eq } from "drizzle-orm"
import { events } from "backend/db/schema/schema"
import { getServerSession } from "next-auth"

// const result = await db.query.users.findMany({
//   with: {
//     posts: true,
//   },
// })

export const userEventQuery = async () => {
  const session = await getServerSession()

  if (!session?.user) {
    return
  }
  const res = await db.select().from(events).where(eq(events.userID, session.user.userID))
  return res
}
