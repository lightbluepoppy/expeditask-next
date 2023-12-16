CREATE TABLE `tag_tree` (
	`parent_tag_id` varchar(255) NOT NULL,
	`child_tag_id` varchar(255),
	CONSTRAINT `tag_tree_parent_tag_id` PRIMARY KEY(`parent_tag_id`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`tag_id` varchar(255) NOT NULL,
	`user_id` varchar(255),
	`title` varchar(255),
	`color` varchar(255),
	`image_url` varchar(255),
	CONSTRAINT `tags_tag_id` PRIMARY KEY(`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `task_dependency` (
	`dependant_task_id` varchar(255),
	`dependency_task_id` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `task_instance_dependency` (
	`dependant_task_instance_id` varchar(255),
	`dependency_task_instance_id` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `task_statistics` (
	`task_instance_id` varchar(255),
	`goal_title` varchar(255),
	`goal_value` int,
	`goal_value_unit` varchar(255),
	`current_value` int,
	`note` json
);
--> statement-breakpoint
CREATE TABLE `task_instance_time_entry` (
	`task_instance_id` varchar(255),
	`scheduled_start_time` timestamp,
	`scheduled_end_time` timestamp,
	`actual_start_time` timestamp,
	`actual_end_time` timestamp
);
--> statement-breakpoint
CREATE TABLE `task_instance_tree` (
	`parent_task_instance_id` varchar(255),
	`child_task_instance_id` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `task_instances` (
	`task_instance_id` varchar(255) NOT NULL,
	`task_id` varchar(255),
	`title` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`is_archived` boolean,
	`is_doable` boolean,
	CONSTRAINT `task_instances_task_instance_id` PRIMARY KEY(`task_instance_id`)
);
--> statement-breakpoint
CREATE TABLE `task_tree` (
	`parent_task_id` varchar(255),
	`child_task_id` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`task_id` varchar(255) NOT NULL,
	`task_author_id` varchar(255),
	`title` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`is_archived` boolean,
	`recursive_pattern` json,
	`color` varchar(255),
	`image_url` varchar(255),
	CONSTRAINT `tasks_task_id` PRIMARY KEY(`task_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`)
);
--> statement-breakpoint
ALTER TABLE `tag_tree` ADD CONSTRAINT `tag_tree_parent_tag_id_tags_tag_id_fk` FOREIGN KEY (`parent_tag_id`) REFERENCES `tags`(`tag_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tag_tree` ADD CONSTRAINT `tag_tree_child_tag_id_tags_tag_id_fk` FOREIGN KEY (`child_tag_id`) REFERENCES `tags`(`tag_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tags` ADD CONSTRAINT `tags_user_id_users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_dependency` ADD CONSTRAINT `task_dependency_dependant_task_id_tasks_task_id_fk` FOREIGN KEY (`dependant_task_id`) REFERENCES `tasks`(`task_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_dependency` ADD CONSTRAINT `task_dependency_dependency_task_id_tasks_task_id_fk` FOREIGN KEY (`dependency_task_id`) REFERENCES `tasks`(`task_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_instance_dependency` ADD CONSTRAINT `task_instance_dependency_dependant_task_instance_id_task_instances_task_instance_id_fk` FOREIGN KEY (`dependant_task_instance_id`) REFERENCES `task_instances`(`task_instance_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_instance_dependency` ADD CONSTRAINT `task_instance_dependency_dependency_task_instance_id_task_instances_task_instance_id_fk` FOREIGN KEY (`dependency_task_instance_id`) REFERENCES `task_instances`(`task_instance_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_statistics` ADD CONSTRAINT `task_statistics_task_instance_id_task_instances_task_instance_id_fk` FOREIGN KEY (`task_instance_id`) REFERENCES `task_instances`(`task_instance_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_instance_time_entry` ADD CONSTRAINT `task_instance_time_entry_task_instance_id_tasks_task_id_fk` FOREIGN KEY (`task_instance_id`) REFERENCES `tasks`(`task_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_instance_tree` ADD CONSTRAINT `task_instance_tree_parent_task_instance_id_task_instances_task_instance_id_fk` FOREIGN KEY (`parent_task_instance_id`) REFERENCES `task_instances`(`task_instance_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_instance_tree` ADD CONSTRAINT `task_instance_tree_child_task_instance_id_task_instances_task_instance_id_fk` FOREIGN KEY (`child_task_instance_id`) REFERENCES `task_instances`(`task_instance_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_instances` ADD CONSTRAINT `task_instances_task_id_tasks_task_id_fk` FOREIGN KEY (`task_id`) REFERENCES `tasks`(`task_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_tree` ADD CONSTRAINT `task_tree_parent_task_id_tasks_task_id_fk` FOREIGN KEY (`parent_task_id`) REFERENCES `tasks`(`task_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_tree` ADD CONSTRAINT `task_tree_child_task_id_tasks_task_id_fk` FOREIGN KEY (`child_task_id`) REFERENCES `tasks`(`task_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_task_author_id_users_user_id_fk` FOREIGN KEY (`task_author_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;