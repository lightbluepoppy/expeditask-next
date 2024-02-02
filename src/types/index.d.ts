import {
  InsertUser,
  SelectUser,
  InsertTask,
  SelectTask,
  InsertTaskInstance,
  SelectTaskInstance,
  InsertTaskInstanceTimeEntry,
  SelectTaskInstanceTimeEntry,
  InsertTaskInstanceStatistics,
  SelectTaskInstanceStatistics,
  InsertTags,
  SelectTags,
} from "backend/db/schema/schema"

export type InsertUser = InsertUser
export type SelectUser = SelectUser

export type InsertTask = InsertTask
export type SelectTask = SelectTask

export type InsertTaskInstance = InsertTaskInstance
export type SelectTaskInstance = SelectTaskInstance

export type InsertTaskInstanceTimeEntry = InsertTaskInstanceTimeEntry
export type SelectTaskInstanceTimeEntry = SelectTaskInstanceTimeEntry

export type InsertTaskInstanceStatistics = InsertTaskInstanceStatistics
export type SelectTaskInstanceStatistics = SelectTaskInstanceStatistics

export type InsertTags = InsertTags
export type SelectTags = SelectTags

export type CalendarEvent = {
  id: string
  title: string
  scheduledStartTime: string // ISO string format
  scheduledEndTime: string // ISO string format
  recordedStartTime: string // ISO string format
  recordedEndTime: string // ISO string format
}

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

export type DailyEventColumProps = {
  date?: Date
}

export type EventEditorProps = {
  eventID: string
  top: number
}

export type EventComponentProps = {
  id: CalendarEvent.id
  title: CalendarEvent.title
  // type: TimeType
  startTime: CalendarEvent.scheduledStartTime | CalendarEvent.recordedStartTime
  endTime: CalendarEvent.scheduledEndTime | CalendarEvent.recordedEndTime
}

export type SelectedDateStore = {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  changeSelectedDateBy: (day: number) => void
}

export type SelectedEventStore = {
  selectedEvent: EventComponentProps
  setSelectedEvent: (event: EventComponentProps) => void
  resetSelectedEvent: () => void
}
