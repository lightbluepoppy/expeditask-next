import {
  boolean,
  json,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
  text,
  datetime,
} from "drizzle-orm/mysql-core"
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm"
import type { AdapterAccount } from "@auth/core/adapters"
import { createId } from "@paralleldrive/cuid2"

export const user = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", { mode: "date", fsp: 3 }).defaultNow(),
  image: varchar("image", { length: 255 }),
})

export const account = mysqlTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_accountId", { length: 255 }).notNull(),
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

export const session = mysqlTable("session", {
  sessionToken: varchar("session_token", { length: 255 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationToken = mysqlTable(
  "verification_token",
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

const baseEventColumns = {
  userId: varchar("user_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  title: varchar("title", { length: 255 }).notNull(),
  isArchived: boolean("is_archived").default(false),
  color: varchar("color", { length: 6 }),
}

const baseTypeEventColumns = {
  startTime: timestamp("start_time", { fsp: 3 }).notNull(),
  endTime: timestamp("end_time", { fsp: 3 }).notNull(),
}

export const event = mysqlTable("event", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  ...baseEventColumns,
})

export const scheduledEvent = mysqlTable("scheduled_event", {
  id: varchar("id", { length: 255 }).primaryKey().unique(),
  eventId: varchar("event_id", { length: 255 }),
  ...baseEventColumns,
  ...baseTypeEventColumns,
})

export const recordedEvent = mysqlTable("recorded_event", {
  id: varchar("id", { length: 255 }).primaryKey().unique(),
  ...baseEventColumns,
  ...baseTypeEventColumns,
  scheduledEventId: varchar("scheduled_event_id", { length: 255 }),
  status: varchar("status", { length: 255 }),
})

export const tagEvent = mysqlTable("tag_event", {
  eventId: varchar("eventId", { length: 255 }),
  tagId: varchar("tagId", { length: 255 }),
})

export const tag = mysqlTable("tag", {
  id: varchar("id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  userId: varchar("user_id", { length: 255 }),
  title: varchar("title", { length: 255 }),
  color: varchar("color", { length: 255 }),
})

export const userRelations = relations(user, ({ one, many }) => ({
  account: one(account),
  session: one(session),
  scheduledEvent: many(scheduledEvent),
  recordedEvent: many(recordedEvent),
  events: many(event),
  tag: many(tag),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
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
