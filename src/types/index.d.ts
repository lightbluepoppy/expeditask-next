import { users, event, scheduledEvent, recordedEvent, tag } from "src/db/schema/schema"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"

export type Users = typeof users
export type Event = typeof event
export type ScheduledEvent = typeof scheduledEvent
export type RecordedEvent = typeof recordedEvent
export type Tag = typeof tag

export type InsertUser = InferInsertModel<Users>
export type SelectUser = InferSelectModel<Users>

export type InsertEvent = InferInsertModel<Event>
export type SelectEvent = InferSelectModel<Event>

export type InsertScheduledEvent = InferInsertModel<ScheduledEvent>
export type SelectScheduledEvent = InferSelectModel<ScheduledEvent>

export type InsertRecordedEvent = InferInsertModel<RecordedEvent>
export type SelectRecordedEvent = InferSelectModel<RecordedEvent>

export type InsertTags = InferInsertModel<Tag>
export type SelectTags = InferSelectModel<Tag>

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
  events: InsertScheduledEvent | InsertRecordedEvent
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
  type: EventType
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

export type Tables =
  | typeof event
  | typeof scheduledEvent
  | typeof recordedEvent
  | typeof tag

export type QueryInput = {
  id: Tables["id"]
  date?: Date
}

export type GetAll<T extends Tables> = Promise<InferInsertModel<T>[] | undefined>
