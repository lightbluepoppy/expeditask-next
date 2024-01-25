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

// export type CalendarEventProps = {
//   id: string
//   title: string
//   scheduledStartTime: string // ISO string format
//   scheduledEndTime: string // ISO string format
//   recordedStartTime: string // ISO string format
//   recordedEndTime: string // ISO string format
// }

export type EventTypeProps = {
  type: "scheduled" | "recorded"
}

export type Props = {
  children?: React.ReactNode
}