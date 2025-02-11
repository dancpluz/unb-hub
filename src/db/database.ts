import { SQLiteDatabase } from 'expo-sqlite';

export interface ClassEvent {
  id?: number;
  discipline: string;
  className: string;
  startTime: string;
  endTime: string;
  day: string;
  recurrence: 'daily' | 'weekly' | 'monthly';
  recurrenceDays?: string; // JSON string array for weekly recurrence
}

export const initDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      discipline TEXT NOT NULL,
      className TEXT NOT NULL,
      startTime TEXT NOT NULL,
      endTime TEXT NOT NULL,
      day TEXT NOT NULL,
      recurrence TEXT NOT NULL,
      recurrenceDays TEXT
    );
  `);
};

export const insertClassEvent = async (db: SQLiteDatabase, event: ClassEvent) => {
  await db.runAsync(
    `INSERT INTO classes (discipline, className, startTime, endTime, day, recurrence, recurrenceDays) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      event.discipline,
      event.className,
      event.startTime,
      event.endTime,
      event.day,
      event.recurrence,
      event.recurrenceDays ? JSON.stringify(event.recurrenceDays) : null
    ]
  );
};

export const deleteClassEvent = async (db: SQLiteDatabase, id: number) => {
  await db.runAsync('DELETE FROM classes WHERE id = ?', [id]);
};

