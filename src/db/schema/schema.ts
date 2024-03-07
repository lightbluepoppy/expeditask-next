import {
  boolean,
  json,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import { relations } from "drizzle-orm"
import type { AdapterAccount } from "@auth/core/adapters"
import { createId } from "@paralleldrive/cuid2"

export const user = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date", fsp: 3 }).defaultNow(),
  image: varchar("image", { length: 255 }),
})

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }),
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
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

export const recursiveEvent = mysqlTable("recursive_event", {
  id: varchar("id", { length: 255 }).unique(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  eventId: varchar("event_id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey(),
  recursive_interval: json("recursive_interval"),
})

const baseColumns = {
  userId: varchar("user_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  title: varchar("title", { length: 255 }).notNull(),
  isArchived: boolean("is_archived").default(false),
  color: varchar("color", { length: 6 }),
}

const baseTypedEventColumns = {
  startTime: timestamp("start_time", { fsp: 3 }).notNull(),
  endTime: timestamp("end_time", { fsp: 3 }).notNull(),
  status: varchar("status", { length: 255 }),
}

export const event = mysqlTable("event", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  ...baseColumns,
})

export const scheduledEvent = mysqlTable("scheduled_event", {
  id: varchar("id", { length: 255 }).primaryKey().unique(),
  eventId: varchar("event_id", { length: 255 }),
  ...baseColumns,
  ...baseTypedEventColumns,
})

export const recordedEvent = mysqlTable("recorded_event", {
  id: varchar("id", { length: 255 }).primaryKey().unique(),
  ...baseColumns,
  ...baseTypedEventColumns,
  scheduledEventId: varchar("scheduled_event_id", { length: 255 }),
})

export const tag = mysqlTable("tag", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  ...baseColumns,
})

export const tagEvent = mysqlTable("tag_event", {
  eventId: varchar("eventId", { length: 255 }).primaryKey().unique(),
  tagId: varchar("tagId", { length: 255 }),
})

export const userRelations = relations(user, ({ one, many }) => ({
  accounts: one(accounts),
  sessions: one(sessions),
  events: many(event),
  scheduledEvent: many(scheduledEvent),
  recordedEvent: many(recordedEvent),
  tag: many(tag),
}))

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(user, {
    fields: [accounts.userId],
    references: [user.id],
  }),
}))

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(user, {
    fields: [sessions.userId],
    references: [user.id],
  }),
}))

export const eventRelations = relations(event, ({ one, many }) => ({
  user: one(user, {
    fields: [event.userId],
    references: [user.id],
  }),
  scheduledEvent: many(scheduledEvent),
  recordedEvent: many(recordedEvent),
  tag: many(tag),
}))

export const scheduledEventRelations = relations(scheduledEvent, ({ many }) => ({
  recordedEvent: many(scheduledEvent),
}))

export const recordedEventRelations = relations(recordedEvent, ({ one }) => ({
  scheduledEvent: one(scheduledEvent, {
    fields: [recordedEvent.scheduledEventId],
    references: [scheduledEvent.id],
  }),
}))

export const recursiveEventRelations = relations(recursiveEvent, ({ many }) => ({
  event: many(event),
}))

export const tagRelations = relations(tag, ({ one, many }) => ({
  event: many(event),
  user: one(user),
}))

export const tagEventRelations = relations(tagEvent, ({ one, many }) => ({
  event: one(event, {
    fields: [tagEvent.eventId],
    references: [event.id],
  }),
  tag: many(tag),
}))
