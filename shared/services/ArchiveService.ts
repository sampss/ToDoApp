import { Task } from '@typesafe/Task';

export const archiveTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(task => !task.completed);
};

export const getArchivedTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(task => task.completed);
};