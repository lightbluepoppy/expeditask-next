import type { InsertEvent, QueryInput, SelectEvent } from "src/types"
import { event } from "src/db/schema/schema"
import { BaseRepository } from "src/utils/repositories/baseRepository"

export class EventRepository {
  private eventRepository = new BaseRepository<typeof event>(event)

  async getEvent(data: QueryInput) {
    return this.eventRepository.get(data)
  }

  async getAllEvents(data: QueryInput["userId"]) {
    return this.eventRepository.getAll(data)
  }

  async createEvent(data: InsertEvent) {
    return this.eventRepository.create(data)
  }
}
