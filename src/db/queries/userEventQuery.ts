import { db } from "src/db/server"
import { eq } from "drizzle-orm"
import { events } from "src/db/schema/schema"
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
  const res = await db.select().from(events).where(eq(events.userId, session.user.userId))
  return res
}
