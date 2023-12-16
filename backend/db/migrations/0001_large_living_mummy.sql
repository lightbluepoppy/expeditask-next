ALTER TABLE `task_instances` DROP FOREIGN KEY `task_instances_task_id_tasks_task_id_fk`;
--> statement-breakpoint
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_task_author_id_users_user_id_fk`;
