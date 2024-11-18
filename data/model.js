import { DatabaseSync } from 'node:sqlite';

// Crea una base de datos
const database = new DatabaseSync(`${import.meta.dirname}/main.db`);

// Query que inicializa la base de datos
const initDatabase = `
CREATE TABLE IF NOT EXISTS todos (
    todo_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    created_at INTEGER NOT NULL,
);
`;

// Se ejecuta la inicializacion
database.exec(initDatabase);

export default database;