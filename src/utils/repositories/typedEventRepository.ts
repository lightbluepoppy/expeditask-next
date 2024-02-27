import type {
  InsertScheduledEvent,
  SelectScheduledEvent,
  InsertRecordedEvent,
  SelectRecordedEvent,
} from "src/types"
import { BaseRepository } from "src/utils/repositories/baseRepository"
import { scheduledEvent, recordedEvent } from "src/db/schema/schema"
import { InferInsertModel } from "drizzle-orm"

export class TypedEventRepository<
  T extends typeof scheduledEvent | typeof recordedEvent,
> {
  private eventRepository: BaseRepository<T>

  constructor(table: T) {
    this.eventRepository = new BaseRepository<T>(table)
  }

  async get(id: string) {
    return this.eventRepository.get(id)
  }

  async getAll() {
    return this.eventRepository.getAll()
  }

  async create(event: InferInsertModel<T>) {
    return this.eventRepository.create(event)
  }
}

export class ScheduledEventRepository {
  private scheduledEventRepository = new TypedEventRepository<typeof scheduledEvent>(
    scheduledEvent,
  )

  async getScheduledEvents(id: SelectScheduledEvent["id"]) {
    return this.scheduledEventRepository.get(id)
  }

  async getAllScheduledEvent() {
    return this.scheduledEventRepository.getAll()
  }

  async createScheduledEvent(scheduledEvent: InsertScheduledEvent) {
    return this.scheduledEventRepository.create(scheduledEvent)
  }
}

export class RecordedEventRepository {
  private recordedEventRepository = new BaseRepository<typeof recordedEvent>(
    recordedEvent,
  )

  async getRecordedEvent(id: SelectRecordedEvent["id"]) {
    return this.recordedEventRepository.get(id)
  }

  async getAllRecordedEvents() {
    return this.recordedEventRepository.getAll()
  }

  async createRecordedEvents(recordedEvent: InsertRecordedEvent) {
    return this.recordedEventRepository.create(recordedEvent)
  }
}
