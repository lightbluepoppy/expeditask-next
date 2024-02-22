import type { InsertEvent } from "src/types"
import { events } from "backend/db/schema/schema"
import { BaseRepository } from "src/app/api/repositories/repository"
import { InferSelectModel } from "drizzle-orm"

export class EventRepository {
  private eventRepository = new BaseRepository<typeof events, "eventId">(
    events,
    "eventId",
  )

  async getEvent(eventId: InferSelectModel<typeof events>["eventId"]) {
    return this.eventRepository.get(eventId)
  }

  async getAllEvents() {
    return this.eventRepository.getAll()
  }

  async createEvent(event: InsertEvent) {
    return this.eventRepository.create(event)
  }
}
