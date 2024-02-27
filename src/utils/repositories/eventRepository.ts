import type { InsertEvent, SelectEvent } from "src/types"
import { event } from "src/db/schema/schema"
import { BaseRepository } from "src/utils/repositories/baseRepository"

export class EventRepository {
  private eventRepository = new BaseRepository<typeof event>(event)

  async getEvent(id: SelectEvent["id"]) {
    return this.eventRepository.get(id)
  }

  async getAllEvents() {
    return this.eventRepository.getAll()
  }

  async createEvent(event: InsertEvent) {
    return this.eventRepository.create(event)
  }
}
