import { db } from "backend/db/server"
import { Column, InferInsertModel, InferSelectModel, eq } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"
import { DataType, TableType } from "src/types"
import {
  MySqlColumn,
  MySqlTable,
  MySqlTableWithColumns,
  TableConfig,
} from "drizzle-orm/mysql-core"

class InternalServerError extends Error {
  name = "InternalServerError"
}

export class BaseRepository<
  T extends MySqlTable<TableConfig>,
  IDKey extends MySqlColumn,
> {
  protected table: T
  protected idKey: IDKey

  constructor(table: T, idKey: IDKey) {
    this.table = table
    this.idKey = idKey
  }

  async select(id: IDKey) {
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

  async selectAll() {
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

  async insert(data: InferInsertModel<T>) {
    const id = createId()
    const dataWithId = { ...data, id } as InferInsertModel<T> & { id: IDKey }
    try {
      const res = await db.insert(this.table).values(dataWithId)
      if (!res) throw new InternalServerError()
      return this.select(dataWithId.id)
    } catch (error) {
      if (error instanceof InternalServerError) {
        console.error(error.message)
        return
      }
    }
  }
}
