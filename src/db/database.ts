import { SQLiteDatabase } from "expo-sqlite";

// File: /src/db/database.ts
export interface ClassEvent {
  id?: number;
  discipline: string;
  className: string;
  startTime: string;
  endTime: string;
  day: string;
  recurrence: 'daily' | 'weekly' | 'monthly';
  recurrenceDays?: string;
  color: string; // Nova propriedade
}

export const resetDatabase = async (db: SQLiteDatabase) => {
  // Drop the existing table
  await db.execAsync(`DROP TABLE IF EXISTS classes;`);

  // Recreate the table
  await initDatabase(db);
};

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
      recurrenceDays TEXT,
      color TEXT
    );
  `);
};

export const insertClassEvent = async (db: SQLiteDatabase, event: ClassEvent) => {
  try {
    await db.runAsync(
      `INSERT INTO classes (discipline, className, startTime, endTime, day, recurrence, recurrenceDays, color) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        event.discipline,
        event.className,
        event.startTime,
        event.endTime,
        event.day,
        event.recurrence,
        event.recurrenceDays ? JSON.stringify(event.recurrenceDays) : null,
        event.color
      ]
    );
  } catch (error) {
    console.error('Error inserting class event:', error);
  }
};

export const deleteClassEvent = async (db: SQLiteDatabase, id: number) => {
  await db.runAsync('DELETE FROM classes WHERE id = ?', [id]);
};

