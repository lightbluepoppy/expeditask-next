import type {
  InsertEvent,
  InsertEventInstance,
  SelectEvent,
  SelectEventInstance,
} from "src/types"
import { events, eventInstances } from "backend/db/schema/schema"
import { BaseRepository } from "src/app/api/crud"
import { db } from "backend/db/server"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"

export class EventHandler {
  private eventRepository = new BaseRepository<typeof events, (typeof events)["eventId"]>(
    events,
    events.eventId,
  )

  async getEvent(eventId: InferSelectModel<typeof events>["eventId"]) {
    return this.eventRepository.select(eventId)
  }

  async getAllEvents() {
    const a = events.eventId
    return this.eventRepository.selectAll()
  }

  async createEvent(event: InsertEvent) {
    return this.eventRepository.insert(event)
  }
}

export class EventInstanceHandler {
  private eventInstanceRepository = new BaseRepository<
    typeof eventInstances,
    (typeof eventInstances)["eventInstanceId"]
  >(eventInstances, eventInstances.eventInstanceId)

  async getEventInstance(eventInstanceId: SelectEventInstance["eventInstanceId"]) {
    return this.eventInstanceRepository.select(eventInstanceId)
  }

  async getAllEventInstances() {
    return this.eventInstanceRepository.selectAll()
  }

  async createEventInstance(eventInstance: InsertEventInstance) {
    return this.eventInstanceRepository.insert(eventInstance)
  }
}
