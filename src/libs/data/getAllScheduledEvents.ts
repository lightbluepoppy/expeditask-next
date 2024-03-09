"use server"

import { cache } from "react"
import type { ScheduledEvent } from "src/types"
import { TypedEventRepository } from "src/libs/repositories/typedEventRepository"
import { scheduledEvent } from "src/db/schema/schema"

export const getAllScheduledEvents = async () => {
  return cache(async () => {
    const response = await new TypedEventRepository<ScheduledEvent>(
      scheduledEvent,
    ).getAll()
    console.log(response)
    return response
  })
}
