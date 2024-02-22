import {
  users,
  events,
  eventInstances,
  eventInstanceTimeEntry,
  eventInstanceStatistics,
  tags,
} from "backend/db/schema/schema"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"

export type InsertUser = InferInsertModel<typeof users>
export type SelectUser = InferSelectModel<typeof users>

export type InsertEvent = InferInsertModel<typeof events>
export type SelectEvent = InferSelectModel<typeof events>

export type InsertEventInstance = InferInsertModel<typeof eventInstances>
export type SelectEventInstance = InferSelectModel<typeof eventInstances>

// export type InsertEventInstanceTimeEntry = InferInsertModel<typeof eventInstanceTimeEntry>
// export type SelectEventInstanceTimeEntry = InferSelectModel<typeof eventInstanceTimeEntry>

export type InsertEventInstanceStatistics = InferInsertModel<
  typeof eventInstanceStatistics
>
export type SelectEventInstanceStatistics = InferSelectModel<
  typeof eventInstanceStatistics
>

export type InsertTags = InferInsertModel<typeof tags>
export type SelectTags = InferSelectModel<typeof tags>

export type CalendarEvent = {
  id: string
  title: string
  scheduledStartTime: string // ISO string format
  scheduledEndTime: string // ISO string format
  recordedStartTime: string // ISO string format
  recordedEndTime: string // ISO string format
}

// export type CalendarEvent = InsertEventInstance

export type EventType = "scheduled" | "recorded"
export type TimeType = "start" | "end"
export type CalendarView = "day" | "week"

export type Props = {
  children: React.ReactNode
}

export type EventProps = {
  date: Date
  events: CalendarEvent[]
  type: EventType
}

export type NewEventProps = {
  date: Date
  type: EventType
}

export type DailyEventColumProps = {
  date?: Date
}

export type EventEditorProps = {
  eventId: string
  top: number
}

export type EventComponentProps = {
  id: CalendarEvent["id"]
  title: CalendarEvent["title"]
  type: EventType
  startTime: CalendarEvent["scheduledStartTime"] | CalendarEvent["recordedStartTime"]
  endTime: CalendarEvent["scheduledEndTime"] | CalendarEvent["recordedEndTime"]
}

export type SelectedDateStore = {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  changeSelectedDateBy: (day: number) => void
}

export type SelectedEventStore = {
  selectedEvent: EventComponentProps | undefined
  setSelectedEvent: (event: EventComponentProps) => void
  resetSelectedEvent: () => void
}

export type QueryProps = typeof events | typeof eventInstances
export async function getAllEventEvents() {
  try {
    const res = await db.select().from(events)
    if (!res) throw new InternalServerError()
    return res
  } catch (error) {
    if (error instanceof InternalServerError) {
      console.error(error.message)
      return
    }
  }
}
export type QueryAllProps = typeof events | typeof eventInstances
export type TableType = typeof events | typeof eventInstances
export type IdType = typeof events.eventId | typeof eventInstances.eventInstanceId
export type DataType = InsertEvent | InsertEventInstance
