import type { InsertEvent, QueryInput, SelectEvent } from "src/types"
import { event } from "src/db/schema/schema"
import { BaseRepository } from "src/libs/repositories/baseRepository"

export class EventRepository {
  private eventRepository = new BaseRepository<typeof event>(event)

  async get(data: QueryInput) {
    return this.eventRepository.get(data)
  }

  async getAll() {
    return this.eventRepository.getAll()
  }

  async create(data: InsertEvent) {
    return this.eventRepository.create(data)
  }

  async update(data: InsertEvent) {
    return this.eventRepository.update(data)
  }

  async archive(data: QueryInput) {
    return this.eventRepository.archive(data)
  }

  async delete(data: QueryInput) {
    return this.eventRepository.delete(data)
  }
}
