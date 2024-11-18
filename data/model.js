import { DatabaseSync } from 'node:sqlite';

// Crea una base de datos
const database = new DatabaseSync(`${import.meta.dirname}/main.db`);

// Query que inicializa la base de datos
const initDatabase = `
CREATE TABLE IF NOT EXISTS tareas (
    id_tarea TEXT PRIMARY KEY,
    titulo TEXT NOT NULL,
    contenido TEXT NOT NULL,
    fecha INTEGER NOT NULL
);
`;

// Se ejecuta la inicializacion
database.exec(initDatabase);

export default database;