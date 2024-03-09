"use server"

import type {
  SelectEvent,
  RecordedEvent,
  ScheduledEvent,
  SelectRecordedEvent,
  SelectScheduledEvent,
  QueryInput,
} from "src/types"
import { TypedEventRepository } from "src/libs/repositories/typedEventRepository"
import { recordedEvent, scheduledEvent } from "src/db/schema/schema"
import { EventRepository } from "src/libs/repositories/eventRepository"

export async function getAllEvents() {
  const response = await new EventRepository().getAll()
  return response
}

export async function getAllScheduledEvents() {
  const response = await new TypedEventRepository<ScheduledEvent>(scheduledEvent).getAll()
  return response
}

export async function getAllRecordedEvents() {
  const response = await new TypedEventRepository<RecordedEvent>(recordedEvent).getAll()
  return response
}

export async function getEventById(data: QueryInput) {
  const response = await new EventRepository().get(data)
  return response
}

export async function getScheduledEventById(data: QueryInput) {
  const response = await new TypedEventRepository<ScheduledEvent>(scheduledEvent).get(
    data,
  )
  return response
}

export async function getRecordedEventById(data: QueryInput) {
  const response = await new TypedEventRepository<RecordedEvent>(recordedEvent).get(data)
  return response
}

export async function createEvent(data: SelectEvent) {
  const response = await new EventRepository().create(data)
  return response
}

export async function createScheduledEvent(data: SelectScheduledEvent) {
  const response = await new TypedEventRepository<ScheduledEvent>(scheduledEvent).create(
    data,
  )
  return response
}

export async function createRecordedEvent(data: SelectRecordedEvent) {
  const response = await new TypedEventRepository<RecordedEvent>(recordedEvent).create(
    data,
  )
  return response
}

export async function updateEvent(data: SelectEvent) {
  const response = await new EventRepository().update(data)
  return response
}

export async function updateScheduledEvent(data: SelectScheduledEvent) {
  const response = await new TypedEventRepository<ScheduledEvent>(scheduledEvent).update(
    data,
  )
  return response
}

export async function updateRecordedEvent(data: SelectRecordedEvent) {
  const response = await new TypedEventRepository<RecordedEvent>(recordedEvent).update(
    data,
  )
  return response
}

export async function deleteEvent(data: QueryInput) {
  const response = await new EventRepository().delete(data)
  return response
}

export async function deleteScheduledEvent(data: QueryInput) {
  const response = await new TypedEventRepository<ScheduledEvent>(scheduledEvent).delete(
    data,
  )
  return response
}

export async function deleteRecordedEvent(data: QueryInput) {
  const response = await new TypedEventRepository<RecordedEvent>(recordedEvent).delete(
    data,
  )
  return response
}
