import { db } from "src/db/server"
import { InferInsertModel, eq, and } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"
import { MySqlTable, TableConfig } from "drizzle-orm/mysql-core"
import { event, recordedEvent, scheduledEvent, tag } from "src/db/schema/schema"
import { TableDataHandlerInfo, Tables } from "src/types"

class InternalServerError extends Error {
  name = "InternalServerError"
}

/**
 * @param T Table name
 * @param IDkey ID name
 */
// export class BaseRepository<T extends MySqlTable<TableConfig> & { [key: string]: any }> {
export class BaseRepository<T extends Tables> {
  constructor(private table: T) {}

  async get(data: TableDataHandlerInfo) {
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

  async getAll(userId: TableDataHandlerInfo["userId"]) {
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

  async create(data: InferInsertModel<T>) {
    try {
      const res = await db.insert(this.table).values(data)
      if (!res) throw new InternalServerError()
      return res
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }

  // async archive(data: TableDataHandlerInfo) {
  //   try {
  //     const res = await db
  //       .update(this.table)
  //       .set({ isArchived: true })
  //       .where(and(eq(this.table.userId, data.userId), eq(this.table.id, data.id)))
  //     if (!res) throw new InternalServerError()
  //     return this.get(data)
  //   } catch (error) {
  //     if (error instanceof InternalServerError) {
  //       console.error(error.message)
  //       return
  //     }
  //   }
  // }

  async delete(data: TableDataHandlerInfo) {
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
