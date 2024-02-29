import type { InsertEvent, QueryInput, SelectEvent } from "src/types"
import { event } from "src/db/schema/schema"
import { BaseRepository } from "src/libs/repositories/baseRepository"

export class EventRepository {
  private eventRepository = new BaseRepository<typeof event>(event)

  async getEvent(data: QueryInput) {
    return this.eventRepository.get(data)
  }

  async getAllEvents() {
    return this.eventRepository.getAll()
  }

  async createEvent(data: InsertEvent) {
    return this.eventRepository.create(data)
  }
}
