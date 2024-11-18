import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Arregla el uso de __dirname con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializando express
const app = express();
const PORT = 3000;

// Sirviendo archivos estaticos
app.use("/", express.static(path.join(__dirname, 'public')));


//app.use('/api/todos', todosRouter);

//app.use('/api/users', usersRouter);

// GET
app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.sendFile("./public/index.html");
});

app.get("/tareas", (req, res) => {
    //let sql = "SELECT * FROM tareas";
    res.json({"message": "tareas"});
});

// POST
app.post("/nueva-tarea", (req, res) => {
    if(req.body.nombre != "" && req.body.contenido != "") {
        //let sql = `INSERT INTO tareas(title, content)VALUES(?,?)`;
        res.end();
    };
});

// DELETE
app.get("/delete/:title", (req, res) => {
    //let sql = `DELETE FROM tareas WHERE title = ?`;
    if(err) res.status(400).json({"error": err.message});
    res.json({"message": "deleted"});
});

// Iniciando servidor
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`)); 