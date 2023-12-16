ALTER TABLE `task_dependency` DROP FOREIGN KEY `task_dependency_dependant_task_id_tasks_task_id_fk`;
--> statement-breakpoint
ALTER TABLE `task_dependency` DROP FOREIGN KEY `task_dependency_dependency_task_id_tasks_task_id_fk`;
--> statement-breakpoint
ALTER TABLE `task_instance_dependency` DROP FOREIGN KEY `task_instance_dependency_dependant_task_instance_id_task_instances_task_instance_id_fk`;
--> statement-breakpoint
ALTER TABLE `task_instance_dependency` DROP FOREIGN KEY `task_instance_dependency_dependency_task_instance_id_task_instances_task_instance_id_fk`;
--> statement-breakpoint
ALTER TABLE `task_statistics` DROP FOREIGN KEY `task_statistics_task_instance_id_task_instances_task_instance_id_fk`;
--> statement-breakpoint
ALTER TABLE `task_instance_time_entry` DROP FOREIGN KEY `task_instance_time_entry_task_instance_id_tasks_task_id_fk`;
--> statement-breakpoint
ALTER TABLE `task_instance_tree` DROP FOREIGN KEY `task_instance_tree_parent_task_instance_id_task_instances_task_instance_id_fk`;
--> statement-breakpoint
ALTER TABLE `task_instance_tree` DROP FOREIGN KEY `task_instance_tree_child_task_instance_id_task_instances_task_instance_id_fk`;
--> statement-breakpoint
ALTER TABLE `task_tree` DROP FOREIGN KEY `task_tree_parent_task_id_tasks_task_id_fk`;
--> statement-breakpoint
ALTER TABLE `task_tree` DROP FOREIGN KEY `task_tree_child_task_id_tasks_task_id_fk`;
