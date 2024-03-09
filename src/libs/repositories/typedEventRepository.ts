import type { QueryInput, ScheduledEvent, RecordedEvent } from "src/types"
import { BaseRepository } from "src/libs/repositories/baseRepository"
import { InferInsertModel, and, eq, between } from "drizzle-orm"
import { db } from "src/db/server"
import { InternalServerError } from "src/libs/errors"
import { addDays, subDays } from "date-fns"
import { auth } from "src/libs/auth"

export class TypedEventRepository<T extends ScheduledEvent | RecordedEvent> {
  private typedEventRepository: BaseRepository<T>
  private table: T

  constructor(table: T) {
    this.typedEventRepository = new BaseRepository<T>(table)
    this.table = table
  }

  async get(data: QueryInput) {
    return this.typedEventRepository.get(data)
  }

  async getAll() {
    return this.typedEventRepository.getAll()
  }

  async create(data: InferInsertModel<T>) {
    return this.typedEventRepository.create(data)
  }

  async update(data: InferInsertModel<T>) {
    return this.typedEventRepository.update(data)
  }

  async delete(data: QueryInput) {
    return this.typedEventRepository.delete(data)
  }

  async archive(data: QueryInput) {
    return this.typedEventRepository.delete(data)
  }

  // async getEventsByDate() {
  //   const session = await auth()
  //   if (!session?.user) return
  //   try {
  //     const result = await db
  //       .select()
  //       .from(this.table as T)
  //       .where(and(eq(this.table.userId, session.user.userId)))
  //     if (!result) throw new InternalServerError()
  //     return result
  //   } catch (error) {
  //     if (error instanceof InternalServerError) {
  //       console.error(error.message)
  //       return
  //     }
  //   }
  // }
}
