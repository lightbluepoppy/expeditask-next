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
export class BaseRepository<
  T extends MySqlTable<TableConfig> & { [key: string]: any },
  IDKey extends string,
> {
  protected table: T
  protected idKey: IDKey

  constructor(table: T, idKey: IDKey) {
    this.table = table
    this.idKey = idKey
  }

  async get(id: string) {
    try {
      const res = await db
        .select()
        .from(this.table as T)
        .where(eq(this.table[this.idKey], id))
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
    const dataWithId = { ...data, [this.idKey]: createId() }

    try {
      const res = await db.insert(this.table).values(dataWithId)
      if (!res) throw new InternalServerError()
      return this.get(dataWithId[this.idKey])
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }
}
