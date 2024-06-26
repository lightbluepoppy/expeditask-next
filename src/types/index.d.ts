import { user, event, scheduledEvent, recordedEvent, tag } from "src/db/schema/schema"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"

export type Users = typeof user
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

export type EventType = "scheduled" | "recorded"
export type TimeType = "start" | "end"
export type CalendarView = "day" | "week"

export type Props = {
  children: React.ReactNode
}

export type AllEvents = {
  scheduledEvents: SelectScheduledEvent[] | undefined
  recordedEvents: SelectRecordedEvent[] | undefined
}

export type EventProps = {
  date: Date
  events: (SelectScheduledEvent[] | undefined) | (SelectRecordedEvent[] | undefined)
  type: EventType
}

export type NewEventProps = {
  date: Date
  type: EventType
}

export type DailyEventColumnProps = {
  date?: Date
}

export type EventEditorProps = {
  eventId: string
  top: number
}

// export type EventComponentProps<T extends SelectScheduledEvent | SelectRecordedEvent> = {
//   id: T["id"]
//   title: T["title"]
//   type: EventType
//   startTime: T["startTime"]
//   endTime?: T["endTime"]
//   color: T["color"]
//   scheduledEventId: T["scheduledEventId"]
//   status?: T["status"]
// }

export type ScheduledEventComponentProps = {
  id: SelectScheduledEvent["id"]
  title: SelectScheduledEvent["title"]
  type: EventType
  startTime: SelectScheduledEvent["startTime"]
  endTime?: SelectScheduledEvent["endTime"]
  color: SelectScheduledEvent["color"]
}
export type RecordedEventComponentProps = {
  id: SelectRecordedEvent["id"]
  title: SelectRecordedEvent["title"]
  type: EventType
  startTime: SelectRecordedEvent["startTime"]
  endTime?: SelectRecordedEvent["endTime"]
  color: SelectRecordedEvent["color"]
  scheduledEventId: SelectRecordedEvent["scheduledEventId"]
  status: SelectRecordedEvent["status"]
}

export type SelectedEvent = {
  id: InsertScheduledEvent["id"]
  title: InsertScheduledEvent["title"]
  type: string
  startTime: InsertScheduledEvent["startTime"]
  endTime: InsertScheduledEvent["endTime"]
}

export type EventTypes = SelectScheduledEvent | SelectRecordedEvent

export type SelectedDateStore = {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  changeSelectedDateBy: (day: number) => void
}

export type SelectedEventStore = {
  selectedEvent: SelectedEvent | undefined
  setSelectedEvent: (event: SelectedEvent) => void
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
export type GetAllEvents = () => {
  scheduledEvents: Promise<InsertScheduledEvent[] | undefined>
  recordedEvents: Promise<InsertRecordedEvent[] | undefined>
}
