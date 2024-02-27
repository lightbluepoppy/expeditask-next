import { db } from "src/db/server"
import { InferInsertModel, eq, and } from "drizzle-orm"
import { QueryInput, Tables } from "src/types"
import { InternalServerError } from "src/utils/errors"

/**
 * @param T Table name
 * @param IDkey ID name
 */
export class BaseRepository<T extends Tables> {
  constructor(private table: T) {}

  async get(data: QueryInput) {
    try {
      const res = await db
        .select()
        .from(this.table as T)
        .where(and(eq(this.table.userId, data.userId), eq(this.table.id, data.id)))
      if (!res) throw new InternalServerError()
      return res
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }

  async getAll(userId: QueryInput["userId"]) {
    try {
      const res = await db.select().from(this.table).where(eq(this.table.userId, userId))
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
    try {
      const updateObject: { [Key in keyof T["_"]["columns"]]?: any } & {
        isArchived?: boolean
      } = {}
      updateObject.isArchived = true
      const res = await db
        .update(this.table)
        .set(updateObject)
        .where(and(eq(this.table.userId, data.userId), eq(this.table.id, data.id)))
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
    try {
      const res = await db.delete(this.table).where(eq(this.table.userId, data.userId))
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
