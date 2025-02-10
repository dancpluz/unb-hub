import * as SQLite from 'expo-sqlite';

export const initializeDB = async () => {
  const db = await SQLite.openDatabaseAsync('grade_app.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS disciplinas (
      id INTEGER PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      codigo TEXT NOT NULL,
      professor TEXT,
      horarios TEXT NOT NULL
    );

    INSERT INTO disciplinas (nome, codigo, professor, horarios)
    VALUES 
      ('Engenharia de Software', 'ESOFT', 'Dr. Silva', 
        '[{"dia": "ter", "inicio": "08:00", "fim": "10:00"}, 
          {"dia": "qui", "inicio": "08:00", "fim": "10:00"}]'),
      
      ('Banco de Dados', 'BDAD', 'Prof. Souza', 
        '[{"dia": "seg", "inicio": "10:00", "fim": "12:00"}, 
          {"dia": "qua", "inicio": "10:00", "fim": "12:00"}]');
  `);

  return db;
};