import { db } from "src/db/server"
import { InferInsertModel, eq } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"
import { MySqlTable, TableConfig } from "drizzle-orm/mysql-core"

class InternalServerError extends Error {
  name = "InternalServerError"
}

/**
 * @param T Table name
 * @param IDkey ID name
 */
export class BaseRepository<T extends MySqlTable<TableConfig> & { [key: string]: any }> {
  protected table: T

  constructor(table: T) {
    this.table = table
  }

  async get(id: string) {
    try {
      const res = await db
        .select()
        .from(this.table as T)
        .where(eq(this.table.id, id))
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
    try {
      const res = await db.select().from(this.table)
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
    const dataWithId = { ...data, id: createId() }

    try {
      const res = await db.insert(this.table).values(dataWithId)
      if (!res) throw new InternalServerError()
      return this.get(dataWithId.id)
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }
}
