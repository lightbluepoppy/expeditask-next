import { db } from "src/db/server"
import { InferInsertModel, eq, and } from "drizzle-orm"
import { QueryInput, Tables } from "src/types"
import { InternalServerError } from "src/libs/errors"
import { auth } from "src/libs/auth"

/**
 * @param T Table name
 * @param IDkey ID name
 */
export class BaseRepository<T extends Tables> {
  constructor(private table: T) {}

  async get(data: QueryInput) {
    const session = await auth()
    if (!session?.user) return
    try {
      const result = await db
        .select()
        .from(this.table as T)
        .where(
          and(eq(this.table.userId, session.user.userId), eq(this.table.id, data.id)),
        )
      if (!result) throw new InternalServerError()
      return result
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }

  async getAll() {
    const session = await auth()

    if (!session?.user) throw new Error()
    try {
      const result = await db
        .select()
        .from(this.table)
        .where(eq(this.table.userId, session.user.userId))
      if (!result) throw new InternalServerError()
      return result
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }

  async create(data: InferInsertModel<T>) {
    try {
      const result = await db.insert(this.table).values(data as any)
      if (!result) throw new InternalServerError()
      return result
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }

  async update(data: InferInsertModel<T>) {
    const session = await auth()
    if (!session?.user) throw new Error()
    try {
      const result = await db
        .update(this.table)
        .set(data as any)
        .where(
          // it says 'Property 'id' does not exist' but fine
          and(eq(this.table.userId, session.user.userId), eq(this.table.id, data.id)),
        )
      if (!result) throw new InternalServerError()
      return result
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }

  async archive(data: QueryInput) {
    const session = await auth()
    if (!session?.user) throw new Error()
    try {
      const updateObject: { [Key in keyof T["_"]["columns"]]?: any } & {
        isArchived?: boolean
      } = {}
      updateObject.isArchived = true
      const result = await db
        .update(this.table)
        .set(updateObject)
        .where(
          and(eq(this.table.userId, session.user.userId), eq(this.table.id, data.id)),
        )
      if (!result) throw new InternalServerError()
      return result
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }

  async delete(data: QueryInput) {
    const session = await auth()
    if (!session?.user) throw new Error()
    try {
      const result = await db
        .delete(this.table)
        .where(
          and(eq(this.table.userId, session.user.userId), eq(this.table.id, data.id)),
        )
      if (!result) throw new InternalServerError()
      return result
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }
}
