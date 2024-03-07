"use server"

import { cache } from "react"
import type { RecordedEvent } from "src/types"
import { TypedEventRepository } from "src/libs/repositories/typedEventRepository"
import { recordedEvent } from "src/db/schema/schema"

export const getAllRecordedEvents = async () => {
  return cache(async () => {
    const response = await new TypedEventRepository<RecordedEvent>(recordedEvent).getAll()
    console.log(response)
    return response
  })
}
