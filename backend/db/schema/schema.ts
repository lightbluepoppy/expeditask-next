import {
  boolean,
  json,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/mysql-core"
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm"
import type { AdapterAccount } from "@auth/core/adapters"
import { createId } from "@paralleldrive/cuid2"

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date", fsp: 3 }).defaultNow(),
  image: varchar("image", { length: 255 }),
})

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  // .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    // compoundKey: primaryKey(vt.identifier, vt.token),
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

export const events = mysqlTable("events", {
  eventId: varchar("event_id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey(),
  // userId: varchar("event_author_id", { length: 255 }).references(() => users.userId),
  userId: varchar("event_author_id", { length: 255 }),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isArchived: boolean("is_archived"),
  recursivePattern: json("recursive_pattern"),
  color: varchar("color", { length: 255 }),
  imageURL: varchar("image_url", { length: 255 }),
})

export const eventInstances = mysqlTable("event_instances", {
  eventInstanceId: varchar("event_instance_id", { length: 255 }).primaryKey(),
  // eventId: varchar("event_id", { length: 255 }).references(() => events.eventId),
  eventId: varchar("event_id", { length: 255 }),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isArchived: boolean("is_archived"),
  // isDoable: boolean("is_doable"),
  eventType: text("event_type", { enum: ["scheduled", "recorded"] }),
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
})

// export const eventInstanceTimeEntry = mysqlTable("event_instance_time_entry", {
//   eventInstanceId: varchar("event_instance_id", { length: 255 }).unique(),
//   scheduledStartTime: timestamp("scheduled_start_time"),
//   scheduledEndTime: timestamp("scheduled_end_time"),
//   recordedStartTime: timestamp("recorded_start_time"),
//   recordedEndTime: timestamp("recorded_end_time"),
// })

export const eventInstanceStatistics = mysqlTable("event_statistics", {
  eventInstanceId: varchar("event_instance_id", { length: 255 }).unique(),
  goalTitle: varchar("goal_title", { length: 255 }),
  goalValue: int("goal_value"),
  goalValueUnit: varchar("goal_value_unit", { length: 255 }),
  currentValue: int("current_value"),
  note: json("note"),
})

export const eventDependency = mysqlTable("event_dependency", {
  dependantEventId: varchar("dependant_event_id", { length: 255 }).unique(),
  dependencyEventId: varchar("dependency_event_id", { length: 255 }),
})

export const eventInstanceDependency = mysqlTable("event_instance_dependency", {
  dependantEventInstanceId: varchar("dependant_event_instance_id", {
    length: 255,
  }).unique(),
  dependencyEventInstanceId: varchar("dependency_event_instance_id", {
    length: 255,
  }),
})

export const eventTree = mysqlTable("event_tree", {
  parentEventId: varchar("parent_event_id", { length: 255 }).unique(),
  childEventInstanceId: varchar("child_event_id", { length: 255 }),
})

export const eventInstanceTree = mysqlTable("event_instance_tree", {
  parentEventInstanceId: varchar("parent_event_instance_id", { length: 255 }).unique(),
  childEventId: varchar("child_event_instance_id", { length: 255 }),
})

export const tags = mysqlTable("tags", {
  tagId: varchar("tag_id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey(),
  // userId: varchar("user_id", { length: 255 }).references(() => users.userId),
  userId: varchar("user_id", { length: 255 }),
  title: varchar("title", { length: 255 }),
  color: varchar("color", { length: 255 }),
  imageURL: varchar("image_url", { length: 255 }),
})

export const tagTree = mysqlTable("tag_tree", {
  parentTagId: varchar("parent_tag_id", { length: 255 }).primaryKey(),
  // childTagId: varchar("child_tag_id", { length: 255 }).references(() => tags.tagId),
  childTagId: varchar("child_tag_id", { length: 255 }),
})

export const userRelations = relations(users, ({ one, many }) => ({
  account: one(accounts),
  session: one(sessions),
  events: many(events),
  tags: many(tags),
}))

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const eventRelations = relations(events, ({ one, many }) => ({
  user: one(users, {
    fields: [events.userId],
    references: [users.id],
  }),
  eventInstances: many(eventInstances),
  eventDependency: one(eventDependency),
  eventTree: one(eventTree),
  tags: many(tags),
}))

export const eventInstanceRelations = relations(eventInstances, ({ one }) => ({
  event: one(events, {
    fields: [eventInstances.eventId],
    references: [events.eventId],
  }),
  // eventInstanceTimeEntry: one(eventInstanceTimeEntry),
  eventInstanceStatistics: one(eventInstanceStatistics),
  eventInstanceDependency: one(eventInstanceDependency),
  eventInstanceTree: one(eventInstanceTree),
}))

// export const eventInstanceTimeEntryRelations = relations(
//     eventInstanceTimeEntry,
//     ({ one }) => ({
//         eventInstance: one(eventInstances, {
//             fields: [eventInstanceTimeEntry.eventInstanceId],
//             references: [eventInstances.eventInstanceId],
//         }),
//     }),
// )

export const eventDependencyRelations = relations(eventDependency, ({ many }) => ({
  // events: many(events, {
  //     fields: [eventDependency.dependantEventId],
  //     references: [events.eventId],
  //     relationName: "eventDependency",
  // }),
  events: many(events),
}))

export const eventTreeRelations = relations(eventTree, ({ many }) => ({
  events: many(events),
}))

export const eventInstanceDependencyRelations = relations(
  eventInstanceDependency,
  ({ many }) => ({
    eventInstances: many(eventInstances),
  }),
)

export const eventInstanceTreeRelations = relations(eventInstanceTree, ({ many }) => ({
  eventInstances: many(eventInstances),
}))

export const tagRelations = relations(tags, ({ one, many }) => ({
  events: many(events),
  user: one(users),
}))

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
