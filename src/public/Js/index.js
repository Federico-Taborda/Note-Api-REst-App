// Agregar una tarea
let tituloTarea = document.getElementById("nombre-tarea");
let contenidoTarea = document.getElementById("contenido-tarea");
let agregar = document.getElementById("boton-agregar");

// Carga las tareas al abrir la pagina
cargarTareas();

// Se inicia al agregar una tarea
agregar.addEventListener("click", () => {
    if(tituloTarea.value == "" || contenidoTarea.value == "") {
        pop_Up("#e74c3c", "ADVERTENCIA: Completa los campos");
    }else{
        pop_Up("#21cc71", "Tarea agregada");    
    };
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

// POP-UP
function pop_Up(color, text) {
    let popUp = document.getElementById("pop-up");
    let advertencia = document.getElementById("texto-pop-up");
    let cerrarPopUp = document.getElementById("cerrar-pop-up");
    
    popUp.style.display = "initial";
    popUp.style.backgroundColor = color;
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
    fetch(`/delete/${title}`)
        .then(() => pop_Up("#21cc71", "Tarea borrada"));
}; 

// Cargar tareas en el DOM
function cargarTareas() {
    document.getElementById("tareas").innerHTML = "";
    fetch("/tareas", {method: "GET"})
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

// Prevenir redireccionamiento
document.getElementById("formulario").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre-tarea").value;
    const contenido = document.getElementById("contenido-tarea").value;

    fetch("/nueva-tarea", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre: nombre, contenido: contenido})
    })
    .then(() => cargarTareas())
    .catch((err) => console.log("Error ", err))
});