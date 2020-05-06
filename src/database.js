const sqlite3 = require("sqlite3");

// Conexion a la base de datos
let db = new sqlite3.Database("../database/database.db", (err) => {
    if(err) console.error(err.message);

    db.run(`CREATE TABLE tareas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title text,
        content text
    )`, (err) => {
        if(err) console.log("Tabla ya creada");
    });
});

module.exports = db;