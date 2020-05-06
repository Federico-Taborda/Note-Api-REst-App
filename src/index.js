const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");

// Inicializando express
const app = express();
const port = 3000;

// Parseando body y sirviendo archivos estaticos
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public"));

// GET
app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.sendFile("./public/index.html");
});

app.get("/tareas", (req, res) => {
    let sql = "SELECT * FROM tareas";
    let params = [];
    db.all(sql, params, (err, rows) => {
        if(err) res.status(400).json({"error": err.message});
        
        res.json({"message": "succes", "data": rows});
    });
});

// POST
app.post("/nueva-tarea", (req, res) => {
    // console.log(req.body.nombre, req.body.contenido);

    if(req.body.nombre != "" && req.body.contenido != "") {
        let sql = `INSERT INTO tareas(title, content)VALUES(?,?)`;
        db.run(sql, [req.body.nombre, req.body.contenido], (err) => {
            if(err) console.log(err.message);
            console.log("Se ha insertado una tabla");
        });
        res.end();
    };
});

// DELETE
app.get("/delete/:title", (req, res) => {
    let sql = `DELETE FROM tareas WHERE title = ?`;
    db.run(sql, req.params.title, (err) => {
        if(err) res.status(400).json({"error": err.message});
        res.json({"message": "deleted"});
    });
});

// Iniciando servidor
app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});