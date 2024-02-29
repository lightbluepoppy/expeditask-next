"use server"
import { cache } from "react"
import type { RecordedEvent, ScheduledEvent } from "src/types"
import { TypedEventRepository } from "src/libs/repositories/typedEventRepository"
import { recordedEvent, scheduledEvent } from "src/db/schema/schema"

export const getAllScheduledEvents = cache(async () => {
  const response = await new TypedEventRepository<ScheduledEvent>(scheduledEvent).getAll()
  console.log(response)
  return response
})

export const getAllRecordedEvents = cache(async () => {
  const response = await new TypedEventRepository<RecordedEvent>(recordedEvent).getAll()
  console.log(response)
  return response
})
