// Agregar una tarea
let tituloTarea = document.getElementById("nombre-tarea");
let contenidoTarea = document.getElementById("contenido-tarea");
let agregar = document.getElementById("boton-agregar");

// Carga las tareas al abrir la pagina
//cargarTareas();

// Se inicia al agregar una tarea
agregar.addEventListener("click", (e) => {
    e.preventDefault(); // Previene que el navegador redireccione

    if(tituloTarea.value == "" || contenidoTarea.value == "") 
        notificacion("error", "Los campos no pueden estar vacios");

    const nombre = document.getElementById("nombre-tarea").value;
    const contenido = document.getElementById("contenido-tarea").value;

    // Crea una tarea
    fetch("/todos/nueva-tarea", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre: nombre, contenido: contenido})
    })
    .then(() => notificacion("sucess", "Tarea agregada"))
    .then(() => cargarTareas())
    .catch((err) => console.log("Error ", err))   
});

function agregarTarea(titulo, contenido) {
    let tareas = document.getElementById("tareas");
    tareas.innerHTML += `
    <div class="tarea">
    <h2>${titulo}</h2>
    <article>
        <p>${contenido}</p>
        <input class="boton-borrar" type="button" value="Borrar">
    </article>
    </div>`;
};

// Notificacion
function notificacion(state, text) {
    let colors = { succes: "#e74c3c", error: "#21cc71" };
    let popUp = document.getElementById("pop-up");
    let advertencia = document.getElementById("texto-pop-up");
    let cerrarPopUp = document.getElementById("cerrar-pop-up");

    if(state == "succes") popUp.style.backgroundColor = colors.succes;
    if(state == "error") popUp.style.backgroundColor = colors.error;

    popUp.style.display = "initial";    
    advertencia.innerHTML = text;

    cerrarPopUp.addEventListener("click", () => {
        popUp.style.display = "none";
    });

    setTimeout(() => {
        popUp.style.display = "none";
    }, 5000);
};

// Borrar una tarea del DOM
function borrarTarea() {
    let tareas = document.getElementsByClassName("boton-borrar");
    for(let i = 0; i < tareas.length; i++) {
        let padre = tareas[i].parentNode.parentNode.parentNode;
        let hijo = tareas[i].parentNode.parentNode;
    
        tareas[i].addEventListener("click", () => {
            let titulo = hijo.childNodes[1].textContent;
            padre.removeChild(hijo);
            borrarTareaDB(titulo);
        });
    };
};

// Borrar tarea de la DB
function borrarTareaDB(title) {
    fetch(`/todos/delete/${title}`)
        .then(() => notificacion("succes", "Tarea borrada"));
}; 

// Cargar tareas en el DOM
function cargarTareas() {
    document.getElementById("tareas").innerHTML = "";
    fetch("/todos/tareas", {method: "GET"})
        .then(res => res.json())
        .then(json => {
            json.data.map((tarea) => {
                agregarTarea(tarea.title, tarea.content);
            });
        })
        .then(() => {
            borrarTarea();
        });
};