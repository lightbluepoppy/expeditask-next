import {
  boolean,
  json,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
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
    // .references(() => users.id, { onDelete: "cascade" }),
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
    // compoundKey: primaryKey(account.provider, account.providerAccountId),
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

export const tasks = mysqlTable("tasks", {
  taskID: varchar("task_id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey(),
  // userID: varchar("task_author_id", { length: 255 }).references(() => users.userID),
  userID: varchar("task_author_id", { length: 255 }),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isArchived: boolean("is_archived"),
  recursivePattern: json("recursive_pattern"),
  color: varchar("color", { length: 255 }),
  imageURL: varchar("image_url", { length: 255 }),
})

export const taskInstances = mysqlTable("task_instances", {
  taskInstanceID: varchar("task_instance_id", { length: 255 }).primaryKey(),
  // taskID: varchar("task_id", { length: 255 }).references(() => tasks.taskID),
  taskID: varchar("task_id", { length: 255 }),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isArchived: boolean("is_archived"),
  isDoable: boolean("is_doable"),
})

export const taskInstanceTimeEntry = mysqlTable("task_instance_time_entry", {
  taskInstanceID: varchar("task_instance_id", { length: 255 }).unique(),
  scheduledStartTime: timestamp("scheduled_start_time"),
  scheduledEndTime: timestamp("scheduled_end_time"),
  recordedStartTime: timestamp("recorded_start_time"),
  recordedEndTime: timestamp("recorded_end_time"),
})

export const taskInstanceStatistics = mysqlTable("task_statistics", {
  taskInstanceID: varchar("task_instance_id", { length: 255 }).unique(),
  goalTitle: varchar("goal_title", { length: 255 }),
  goalValue: int("goal_value"),
  goalValueUnit: varchar("goal_value_unit", { length: 255 }),
  currentValue: int("current_value"),
  note: json("note"),
})

export const taskDependency = mysqlTable("task_dependency", {
  dependantTaskID: varchar("dependant_task_id", { length: 255 }).unique(),
  dependencyTaskID: varchar("dependency_task_id", { length: 255 }),
})

export const taskInstanceDependency = mysqlTable("task_instance_dependency", {
  dependantTaskInstanceID: varchar("dependant_task_instance_id", {
    length: 255,
  }).unique(),
  dependencyTaskInstanceID: varchar("dependency_task_instance_id", {
    length: 255,
  }),
})

export const taskTree = mysqlTable("task_tree", {
  parentTaskID: varchar("parent_task_id", { length: 255 }).unique(),
  childTaskInstanceID: varchar("child_task_id", { length: 255 }),
})

export const taskInstanceTree = mysqlTable("task_instance_tree", {
  parentTaskInstanceID: varchar("parent_task_instance_id", { length: 255 }).unique(),
  childTaskID: varchar("child_task_instance_id", { length: 255 }),
})

export const tags = mysqlTable("tags", {
  tagID: varchar("tag_id", { length: 255 })
    .$defaultFn(() => createId())
    .primaryKey(),
  // userID: varchar("user_id", { length: 255 }).references(() => users.userID),
  userID: varchar("user_id", { length: 255 }),
  title: varchar("title", { length: 255 }),
  color: varchar("color", { length: 255 }),
  imageURL: varchar("image_url", { length: 255 }),
})

export const tagTree = mysqlTable("tag_tree", {
  parentTagID: varchar("parent_tag_id", { length: 255 }).primaryKey(),
  // childTagID: varchar("child_tag_id", { length: 255 }).references(() => tags.tagID),
  childTagID: varchar("child_tag_id", { length: 255 }),
})

export const userRelations = relations(users, ({ one, many }) => ({
  account: one(accounts),
  session: one(sessions),
  tasks: many(tasks),
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

export const taskRelations = relations(tasks, ({ one, many }) => ({
  user: one(users, {
    fields: [tasks.userID],
    references: [users.id],
  }),
  taskInstances: many(taskInstances),
  taskDependency: one(taskDependency),
  taskTree: one(taskTree),
  tags: many(tags),
}))

export const taskInstanceRelations = relations(taskInstances, ({ one }) => ({
  task: one(tasks, {
    fields: [taskInstances.taskID],
    references: [tasks.taskID],
  }),
  taskInstanceTimeEntry: one(taskInstanceTimeEntry),
  taskInstanceStatistics: one(taskInstanceStatistics),
  taskInstanceDependency: one(taskInstanceDependency),
  taskInstanceTree: one(taskInstanceTree),
}))

// export const taskInstanceTimeEntryRelations = relations(
//     taskInstanceTimeEntry,
//     ({ one }) => ({
//         taskInstance: one(taskInstances, {
//             fields: [taskInstanceTimeEntry.taskInstanceID],
//             references: [taskInstances.taskInstanceID],
//         }),
//     }),
// )

export const taskDependencyRelations = relations(taskDependency, ({ many }) => ({
  // tasks: many(tasks, {
  //     fields: [taskDependency.dependantTaskID],
  //     references: [tasks.taskID],
  //     relationName: "taskDependency",
  // }),
  tasks: many(tasks),
}))

export const taskTreeRelations = relations(taskTree, ({ many }) => ({
  tasks: many(tasks),
}))

export const taskInstanceDependencyRelations = relations(
  taskInstanceDependency,
  ({ many }) => ({
    taskInstances: many(taskInstances),
  }),
)

export const taskInstanceTreeRelations = relations(taskInstanceTree, ({ many }) => ({
  taskInstances: many(taskInstances),
}))

export const tagRelations = relations(tags, ({ one, many }) => ({
  tasks: many(tasks),
  user: one(users),
}))

export type InsertUser = InferInsertModel<typeof users>
export type SelectUser = InferSelectModel<typeof users>

export type InsertTask = InferInsertModel<typeof tasks>
export type SelectTask = InferSelectModel<typeof tasks>

export type InsertTaskInstance = InferInsertModel<typeof taskInstances>
export type SelectTaskInstance = InferSelectModel<typeof taskInstances>

export type InsertTaskInstanceTimeEntry = InferInsertModel<typeof taskInstanceTimeEntry>
export type SelectTaskInstanceTimeEntry = InferSelectModel<typeof taskInstanceTimeEntry>

export type InsertTaskInstanceStatistics = InferInsertModel<typeof taskInstanceStatistics>
export type SelectTaskInstanceStatistics = InferSelectModel<typeof taskInstanceStatistics>

export type InsertTags = InferInsertModel<typeof tags>
export type SelectTags = InferSelectModel<typeof tags>
