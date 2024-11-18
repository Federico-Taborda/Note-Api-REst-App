import database from "./model.js";

// Querys para crear, obtener, actualizar y eliminar tareas

const createTodo = database.prepare(`
    INSERT INTO todos (todo_id, title, created_at)    
    VALUES (?,?,?)
    RETURNING todo_id, title, created_at
`);

const getTodos = database.prepare(`
    SELECT * FROM todos
`);

const getTodoById = database.prepare(`
    SELECT * FROM todos WHERE todo_id = ?
`);

const deleteTodo = database.prepare(`
    DELETE from todos WHERE todo_id = ?
`);

export {
    createTodo,
    getTodos,
    getTodoById,
    deleteTodo
}