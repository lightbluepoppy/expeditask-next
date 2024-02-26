import { users, event, scheduledEvent, recordedEvent, tag } from "src/db/schema/schema"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"

export type InsertUser = InferInsertModel<typeof users>
export type SelectUser = InferSelectModel<typeof users>

export type InsertEvent = InferInsertModel<typeof event>
export type SelectEvent = InferSelectModel<typeof event>

export type InsertScheduledEvent = InferInsertModel<typeof scheduledEvent>
export type SelectScheduledEvent = InferSelectModel<typeof scheduledEvent>

export type InsertRecordedEvent = InferInsertModel<typeof recordedEvent>
export type SelectRecordedEvent = InferSelectModel<typeof recordedEvent>

export type InsertTags = InferInsertModel<typeof tag>
export type SelectTags = InferSelectModel<typeof tag>

export type CalendarEvent = InsertEvent

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

export type EventComponentProps<T extends SelectScheduledEvent | SelectRecordedEvent> = {
  id: T["id"]
  title: T["title"]
  type: T extends SelectScheduledEvent ? "scheduled" : "recorded"
  startTime: T["startTime"]
  endTime?: T["endTime"]
  color: T["color"]
}

export type EventGenericTypes = SelectScheduledEvent | SelectRecordedEvent

export type SelectedDateStore = {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  changeSelectedDateBy: (day: number) => void
}

export type SelectedEventStore<T extends SelectScheduledEvent | SelectRecordedEvent> = {
  selectedEvent: EventComponentProps<T> | undefined
  setSelectedEvent: (event: EventComponentProps<T>) => void
  resetSelectedEvent: () => void
}
