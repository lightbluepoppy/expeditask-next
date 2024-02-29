import type { QueryInput, ScheduledEvent, RecordedEvent } from "src/types"
import { BaseRepository } from "src/libs/repositories/baseRepository"
import { InferInsertModel, and, eq, between } from "drizzle-orm"
import { db } from "src/db/server"
import { InternalServerError } from "src/libs/errors"
import { addDays, subDays } from "date-fns"
import { getServerSession } from "next-auth"

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

  async create(eventData: InferInsertModel<T>) {
    return this.typedEventRepository.create(eventData)
  }

  async delete(data: QueryInput) {
    return this.typedEventRepository.delete(data)
  }

  async archive(data: QueryInput) {
    return this.typedEventRepository.delete(data)
  }

  async getEventsByDate() {
    const session = await getServerSession()
    if (!session?.user) return
    try {
      const result = await db
        .select()
        .from(this.table as T)
        .where(
          and(
            eq(this.table.userId, session.user.userId),
            // between(
            //   this.table.startTime,
            //   subDays(new Date(this.table.startTime), 7),
            //   addDays(new Date(this.table.endTime), 7),
            // ),
          ),
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

// export class ScheduledEventRepository {
//   private scheduledEventRepository = new TypedEventRepository<typeof scheduledEvent>(
//     scheduledEvent,
//   )

//   async getScheduledEvents(data: QueryInput) {
//     return this.scheduledEventRepository.get(data)
//   }

//   async getAllScheduledEvents(): Promise<InsertRecordedEvent[] | undefined> {
//     return this.scheduledEventRepository.getAll()
//   }

//   async createScheduledEvent(eventData: InsertScheduledEvent) {
//     return this.scheduledEventRepository.create(eventData)
//   }

//   async archiveScheduledEvent(data: QueryInput) {
//     return this.scheduledEventRepository.archive(data)
//   }

//   async deleteScheduledEvent(data: QueryInput) {
//     return this.scheduledEventRepository.delete(data)
//   }
// }

// export class RecordedEventRepository {
//   private recordedEventRepository = new BaseRepository<typeof recordedEvent>(
//     recordedEvent,
//   )

//   async getRecordedEvent(data: QueryInput) {
//     return this.recordedEventRepository.get(data)
//   }

//   async getAllRecordedEvents() {
//     return this.recordedEventRepository.getAll()
//   }

//   async createRecordedEvents(eventData: InsertRecordedEvent) {
//     return this.recordedEventRepository.create(eventData)
//   }

//   async archiveRecordedEvent(data: QueryInput) {
//     return this.recordedEventRepository.archive(data)
//   }

//   async deleteRecordedEvent(data: QueryInput) {
//     return this.recordedEventRepository.delete(data)
//   }
// }
