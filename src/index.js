import express from "express";
import { PORT } from './config.js';
import todosRouter from './routes/todos.routes.js';

// Inicializando express
const app = express();

// Middleware para procesar cuerpos JSON
app.use(express.json());

app.use('/todos', todosRouter);

// Iniciando servidor
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`)); 