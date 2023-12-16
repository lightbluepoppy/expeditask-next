import {
    boolean,
    json,
    int,
    mysqlTable,
    timestamp,
    varchar,
} from "drizzle-orm/mysql-core"
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"

export const users = mysqlTable("users", {
    userID: varchar("user_id", { length: 255 })
        .$defaultFn(() => createId())
        .primaryKey(),
    username: varchar("username", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    // account_id: varchar("id")
    //     .$defaultFn(() => createId())
    //     .primaryKey(),
})

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
    taskInstanceID: varchar("task_instance_id", { length: 255 }),
    scheduledStartTime: timestamp("scheduled_start_time"),
    scheduledEndTime: timestamp("scheduled_end_time"),
    actualStartTime: timestamp("actual_start_time"),
    actualEndTime: timestamp("actual_end_time"),
})

export const taskInstanceStatistics = mysqlTable("task_statistics", {
    taskInstanceID: varchar("task_instance_id", { length: 255 }),
    goalTitle: varchar("goal_title", { length: 255 }),
    goalValue: int("goal_value"),
    goalValueUnit: varchar("goal_value_unit", { length: 255 }),
    currentValue: int("current_value"),
    note: json("note"),
})

export const taskDependency = mysqlTable("task_dependency", {
    dependantTaskID: varchar("dependant_task_id", { length: 255 }),
    dependencyTaskID: varchar("dependency_task_id", { length: 255 }),
})

export const taskInstanceDependency = mysqlTable("task_instance_dependency", {
    dependantTaskInstanceID: varchar("dependant_task_instance_id", {
        length: 255,
    }),
    dependencyTaskInstanceID: varchar("dependency_task_instance_id", {
        length: 255,
    }),
})

export const taskTree = mysqlTable("task_tree", {
    parentTaskID: varchar("parent_task_id", { length: 255 }),
    childTaskInstanceID: varchar("child_task_id", { length: 255 }),
})

export const taskInstanceTree = mysqlTable("task_instance_tree", {
    parentTaskInstanceID: varchar("parent_task_instance_id", { length: 255 }),
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

export const userRelations = relations(users, ({ many }) => ({
    tasks: many(tasks),
    tags: many(tags),
}))

export const taskRelations = relations(tasks, ({ one, many }) => ({
    user: one(users, {
        fields: [tasks.userID],
        references: [users.userID],
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

export const taskDependencyRelations = relations(taskDependency, ({ one, many }) => ({
    // tasks: many(tasks, {
    //     fields: [taskDependency.dependantTaskID],
    //     references: [tasks.taskID],
    //     relationName: "taskDependency",
    // }),
    tasks: many(tasks),
}))

export const taskTreeRelations = relations(taskTree, ({ one, many }) => ({
    tasks: many(tasks),
}))

export const taskInstanceDependencyRelations = relations(
    taskInstanceDependency,
    ({ one, many }) => ({
        taskInstances: many(taskInstances),
    }),
)

export const taskInstanceTreeRelations = relations(taskInstanceTree, ({ one, many }) => ({
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
