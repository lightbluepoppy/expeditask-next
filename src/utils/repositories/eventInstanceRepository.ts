import type { InsertEventInstance, SelectEventInstance } from "src/types"
import { eventInstances } from "src/db/schema/schema"
import { BaseRepository } from "src/utils/repositories/repository"

export class EventInstanceRepository {
  private eventInstanceRepository = new BaseRepository<
    typeof eventInstances,
    "eventInstanceId"
  >(eventInstances, "eventInstanceId")

  async getEventInstance(eventInstanceId: SelectEventInstance["eventInstanceId"]) {
    return this.eventInstanceRepository.get(eventInstanceId)
  }

  async getAllEventInstances() {
    return this.eventInstanceRepository.getAll()
  }

  async createEventInstance(eventInstance: InsertEventInstance) {
    return this.eventInstanceRepository.create(eventInstance)
  }
}
