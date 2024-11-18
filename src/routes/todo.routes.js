// routes/todos.router.js
import express from 'express';
import { nanoid } from 'nanoid';
import { 
  createTodo, 
  getTodos, 
  getTodoById, 
  updateTodoCheckById,
  deleteTodo
} from '../data/queries.js';

const todosRouter = express.Router();

// Crea una tarea
todosRouter.post('/', (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(400).json({ error: 'Missing Todo Title' });

  const todoId = nanoid(6);
  const createdAt = Date.now();
  const addedTodo = createTodo.get(todoId, title, createdAt);

  return res.status(201).json({
    todoId,
    title,
    joined: new Date(addedTodo.created_at).toISOString(),
  });
});

// Lista todas las tareas
todosRouter.get('/', (req, res) => {
  const todos = getTodos.all();
  return res.status(200).json(
    todos.map(({ todo_id, title, created_at }) => ({
      todoId: todo_id,
      title,
      createdAt: new Date(created_at).toISOString(),
    }))
  );
});


// Delete a todo by ID
todosRouter.delete('/:id', (req, res) => {
  const todoId = req.params.id;
  const recordedTodo = getTodoById.get(todoId);
  if (!recordedTodo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  deleteTodo.run(todoId, defaultUserId);
  return res.status(200).json({ message: 'Todo successfully deleted!' });
});

export default todosRouter;