import { relations } from "drizzle-orm"
import type { AdapterAccount } from "@auth/core/adapters"
import { createId } from "@paralleldrive/cuid2"
import {
  pgTable,
  text,
  varchar,
  timestamp,
  integer,
  primaryKey,
  json,
  boolean,
} from "drizzle-orm/pg-core"

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  }),
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

export const recursiveEvent = pgTable("recursive_event", {
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
  updatedAt: timestamp("updated_at").defaultNow(),
  title: varchar("title", { length: 255 }).notNull(),
  isArchived: boolean("is_archived").default(false),
  color: varchar("color", { length: 6 }),
}

const baseTypedEventColumns = {
  startTime: timestamp("start_time", { precision: 3 }).notNull(),
  endTime: timestamp("end_time", { precision: 3 }).notNull(),
  status: varchar("status", { length: 255 }),
}

export const event = pgTable("event", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  ...baseColumns,
})

export const scheduledEvent = pgTable("scheduled_event", {
  id: varchar("id", { length: 255 }).primaryKey().unique(),
  eventId: varchar("event_id", { length: 255 }),
  ...baseColumns,
  ...baseTypedEventColumns,
})

export const recordedEvent = pgTable("recorded_event", {
  id: varchar("id", { length: 255 }).primaryKey().unique(),
  ...baseColumns,
  ...baseTypedEventColumns,
  scheduledEventId: varchar("scheduled_event_id", { length: 255 }),
})

export const tag = pgTable("tag", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  ...baseColumns,
})

export const tagEvent = pgTable("tag_event", {
  eventId: varchar("eventId", { length: 255 }).primaryKey().unique(),
  tagId: varchar("tagId", { length: 255 }),
})

export const userRelations = relations(users, ({ one, many }) => ({
  accounts: one(accounts),
  sessions: one(sessions),
  events: many(event),
  scheduledEvent: many(scheduledEvent),
  recordedEvent: many(recordedEvent),
  tag: many(tag),
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

export const eventRelations = relations(event, ({ one, many }) => ({
  user: one(users, {
    fields: [event.userId],
    references: [users.id],
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
  user: one(users),
}))

export const tagEventRelations = relations(tagEvent, ({ one, many }) => ({
  event: one(event, {
    fields: [tagEvent.eventId],
    references: [event.id],
  }),
  tag: many(tag),
}))
