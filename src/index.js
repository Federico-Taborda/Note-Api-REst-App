import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import todosRouter from './routes/todos.routes.js';

// Arregla el uso de __dirname con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializando express
const app = express();
const PORT = 3000;

// Middleware para procesar cuerpos JSON
app.use(express.json());


// Sirviendo archivos estaticos
app.use("/", express.static(path.join(__dirname, 'public')));

app.use('/todos', todosRouter);

// Iniciando servidor
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`)); 