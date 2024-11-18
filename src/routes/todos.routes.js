// routes/todos.router.js
import express from 'express';
import { 
  crearTarea,
  obtenerTareas,
  obtenerTareaPorId,
  borrarTarea
} from '../../data/queries.js';

const todosRouter = express.Router();

// Crea una tarea
todosRouter.post('/nueva-tarea', (req, res) => {
  const { titulo, contenido } = req.body;
  if (!titulo || !contenido) return res.status(400).json({ error: 'Campos incompletos' });

  const idTarea = "cambiar por un id"
  const fecha = Date.now();
  const tareaAgregada = crearTarea.get(idTarea, titulo, contenido, fecha);

  return res.status(201).json({
    todoId: idTarea,
    titulo,
    contenido,
    joined: new Date(tareaAgregada.created_at).toISOString(),
  });
});

// Lista todas las tareas
todosRouter.get('/tareas', (req, res) => {
  const tareas = obtenerTareas.all();
  console.log(tareas)
  return res.status(200).json(
    tareas.map(({ id_tarea, titulo, contenido, fecha }) => ({
      id_tarea: id_tarea,
      titulo,
      contenido,
      fecha: new Date(fecha).toISOString(),
    }))
  );
});


// Delete a todo by ID
todosRouter.delete('/:id', (req, res) => {
  const idTarea = req.params.id;
  const tareaGuardada = obtenerTareaPorId.get(idTarea);
  if (!tareaGuardada) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  
  deleteTodo.run(idTarea);
  return res.status(200).json({ message: 'Tarea eliminada!' });
});

export default todosRouter;