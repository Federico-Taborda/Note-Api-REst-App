import database from "./model.js";

// Querys para crear, obtener, actualizar y eliminar tareas

const crearTarea = database.prepare(`
    INSERT INTO tareas (id_tarea, titulo, contenido, fecha)    
    VALUES (?,?,?,?)
    RETURNING id_tarea, titulo, contenido, fecha
`);

const obtenerTareas = database.prepare(`
    SELECT * FROM tareas
`);

const obtenerTareaPorId = database.prepare(`
    SELECT * FROM tareas WHERE id_tarea = ?
`);

const borrarTarea = database.prepare(`
    DELETE from tareas WHERE id_tarea = ?
`);

export {
    crearTarea,
    obtenerTareas,
    obtenerTareaPorId,
    borrarTarea
}