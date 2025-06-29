import SQLite from 'react-native-sqlite-storage';
import { Task } from '../shared/types/Task';

SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase | null = null;

export const openDB = async (): Promise<void> => {
  if (db) return;

  db = await SQLite.openDatabase({ name: 'tasks.db', location: 'default' });

    await db.executeSql(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed INTEGER DEFAULT 0,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
            completeBy TEXT
        );
    `);
};

export const addTask = async (title: string, completeBy?: string): Promise<Task> => {
  if (!db) throw new Error('Database not initialized.');

  const createdAt = new Date().toISOString();


  const result = await db.executeSql(
    `INSERT INTO tasks (title, createdAt, completeBy) VALUES (?, ?, ?)`,
    [title, createdAt, completeBy || null]
  );

  const insertId = result[0].insertId || Date.now();

  return { id: insertId, title, completed: false, createdAt, completeBy };
};

  const insertId = result[0].insertId || Date.now();

  return { id: insertId, title, completed: false, createdAt };
};

export const getAllTasks = async (): Promise<Task[]> => {
  if (!db) throw new Error('Database not initialized.');

  const results = await db.executeSql(`SELECT * FROM tasks ORDER BY createdAt DESC`);
  const rows = results[0].rows;

  const tasks: Task[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows.item(i);
    tasks.push({
        id: row.id,
        title: row.title,
        completed: !!row.completed,
        createdAt: row.createdAt,
        completeBy: row.completeBy || undefined,
    });
  }
  return tasks;
};