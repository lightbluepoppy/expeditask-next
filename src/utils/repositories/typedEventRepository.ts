import type {
  InsertScheduledEvent,
  SelectScheduledEvent,
  InsertRecordedEvent,
  SelectRecordedEvent,
  QueryInput,
} from "src/types"
import { BaseRepository } from "src/utils/repositories/baseRepository"
import { scheduledEvent, recordedEvent } from "src/db/schema/schema"
import { InferInsertModel, and, eq } from "drizzle-orm"
import { db } from "src/db/server"
import { InternalServerError } from "src/utils/errors"

export class TypedEventRepository<
  T extends typeof scheduledEvent | typeof recordedEvent,
> {
  private typedEventRepository: BaseRepository<T>

  constructor(table: T) {
    this.typedEventRepository = new BaseRepository<T>(table)
  }

  async get(data: QueryInput) {
    return this.typedEventRepository.get(data)
  }

  async getAll(userId: QueryInput["userId"]) {
    return this.typedEventRepository.getAll(userId)
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
}

export class ScheduledEventRepository {
  private scheduledEventRepository = new TypedEventRepository<typeof scheduledEvent>(
    scheduledEvent,
  )

  async getScheduledEvents(data: QueryInput) {
    return this.scheduledEventRepository.get(data)
  }

  async getAllScheduledEvent(userId: QueryInput["userId"]) {
    return this.scheduledEventRepository.getAll(userId)
  }

  async createScheduledEvent(eventData: InsertScheduledEvent) {
    return this.scheduledEventRepository.create(eventData)
  }

  async archiveScheduledEvent(data: QueryInput) {
    return this.scheduledEventRepository.archive(data)
  }

  async deleteScheduledEvent(data: QueryInput) {
    return this.scheduledEventRepository.delete(data)
  }
}

export class RecordedEventRepository {
  private recordedEventRepository = new BaseRepository<typeof recordedEvent>(
    recordedEvent,
  )

  async getRecordedEvent(data: QueryInput) {
    return this.recordedEventRepository.get(data)
  }

  async getAllRecordedEvents(userId: QueryInput["userId"]) {
    return this.recordedEventRepository.getAll(userId)
  }

  async createRecordedEvents(eventData: InsertRecordedEvent) {
    return this.recordedEventRepository.create(eventData)
  }

  async archiveRecordedEvent(data: QueryInput) {
    return this.recordedEventRepository.archive(data)
  }

  async deleteRecordedEvent(data: QueryInput) {
    return this.recordedEventRepository.delete(data)
  }
}
