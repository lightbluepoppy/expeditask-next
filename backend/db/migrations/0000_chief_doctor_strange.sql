CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
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
	`dependency_task_id` varchar(255),
	CONSTRAINT `task_dependency_dependant_task_id_unique` UNIQUE(`dependant_task_id`)
);
--> statement-breakpoint
CREATE TABLE `task_instance_dependency` (
	`dependant_task_instance_id` varchar(255),
	`dependency_task_instance_id` varchar(255),
	CONSTRAINT `task_instance_dependency_dependant_task_instance_id_unique` UNIQUE(`dependant_task_instance_id`)
);
--> statement-breakpoint
CREATE TABLE `task_statistics` (
	`task_instance_id` varchar(255),
	`goal_title` varchar(255),
	`goal_value` int,
	`goal_value_unit` varchar(255),
	`current_value` int,
	`note` json,
	CONSTRAINT `task_statistics_task_instance_id_unique` UNIQUE(`task_instance_id`)
);
--> statement-breakpoint
CREATE TABLE `task_instance_time_entry` (
	`task_instance_id` varchar(255),
	`scheduled_start_time` timestamp,
	`scheduled_end_time` timestamp,
	`actual_start_time` timestamp,
	`actual_end_time` timestamp,
	CONSTRAINT `task_instance_time_entry_task_instance_id_unique` UNIQUE(`task_instance_id`)
);
--> statement-breakpoint
CREATE TABLE `task_instance_tree` (
	`parent_task_instance_id` varchar(255),
	`child_task_instance_id` varchar(255),
	CONSTRAINT `task_instance_tree_parent_task_instance_id_unique` UNIQUE(`parent_task_instance_id`)
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
	`child_task_id` varchar(255),
	CONSTRAINT `task_tree_parent_task_id_unique` UNIQUE(`parent_task_id`)
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
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
