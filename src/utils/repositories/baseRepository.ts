import { db } from "src/db/server"
import { InferInsertModel, eq, and } from "drizzle-orm"
import { QueryInput, Tables } from "src/types"
import { InternalServerError } from "src/utils/errors"
import { getServerSession } from "next-auth"

/**
 * @param T Table name
 * @param IDkey ID name
 */
export class BaseRepository<T extends Tables> {
  constructor(private table: T) {}

  async get(data: QueryInput) {
    const session = await getServerSession()
    if (!session?.user) return
    try {
      const res = await db
        .select()
        .from(this.table as T)
        .where(
          and(eq(this.table.userId, session.user.userId), eq(this.table.id, data.id)),
        )
      if (!res) throw new InternalServerError()
      return res
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }

  async getAll() {
    const session = await getServerSession()
    if (!session?.user) return
    try {
      const res = await db
        .select()
        .from(this.table)
        .where(eq(this.table.userId, session.user.userId))
      if (!res) throw new InternalServerError()
      return res
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }

  async create(eventData: InferInsertModel<T>) {
    try {
      const res = await db.insert(this.table).values(eventData)
      if (!res) throw new InternalServerError()
      return res
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }

  async archive(data: QueryInput) {
    const session = await getServerSession()
    if (!session?.user) return
    try {
      const updateObject: { [Key in keyof T["_"]["columns"]]?: any } & {
        isArchived?: boolean
      } = {}
      updateObject.isArchived = true
      const res = await db
        .update(this.table)
        .set(updateObject)
        .where(
          and(eq(this.table.userId, session.user.userId), eq(this.table.id, data.id)),
        )
      if (!res) throw new InternalServerError()
      return res
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }

  async delete(data: QueryInput) {
    const session = await getServerSession()
    if (!session?.user) return
    try {
      const res = await db
        .delete(this.table)
        .where(
          and(eq(this.table.userId, session.user.userId), eq(this.table.id, data.id)),
        )
      if (!res) throw new InternalServerError()
      return res
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }
}
