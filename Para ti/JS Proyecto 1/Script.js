let personas = [
    {
        Persona: {
            Nombre: "Jhon",
            TareasR: 0,
            Id: 1
        },
        trabajo: true
    },
    {
        Persona: {
            Nombre: "Doe",
            TareasR: 0,
            Id: 2
        },
        trabajo: false
    },
    {
        Persona: {
            Nombre: "Max",
            TareasR: 0,
            Id: 3
        },
        trabajo: false
    }
];

let tareas = [
    {
        Tittle: "Tarea1",
        Descripcion: "Dtarea1",
        DueDate: "2024-04-29",
        Members: [],
        State: "ToDo",
    },
    {
        Tittle: "Tarea2",
        Descripcion: "Dtarea2",
        DueDate: "2023-04-11",
        Members: [],
        State: "ToDo",
    },
    {
        Tittle: "Tarea3",
        Descripcion: "Dtarea3",
        DueDate: "2024-04-25",
        Members: [],
        State: "InProgress",
    },
    {
        Tittle: "Tarea4",
        Descripcion: "Dtarea4",
        DueDate: "2023-03-24",
        Members: [],
        State: "Done",
    }
];
////////
function mostrarDatos() {
    let TMembers = '';
    personas.forEach(persona => {
        TMembers += `<div class="TMember" id="${persona.Persona.Id}" draggable="true"><h2>${persona.Persona.Nombre}</h2></div>`;
    });

    // Mostrar Personas
    document.getElementById('TMembers').innerHTML = TMembers;

    // Mostrar tareas !!!
    let ToDoContainer = document.querySelector(".ToDo");
    let ToDo = "";
    let InProgressContainer = document.querySelector(".InProgress");
    let InProgress = "";
    let DoneContainer = document.querySelector(".Done");
    let Done = "";
    ///////////////

    tareas.forEach(tarea => {
        //task.filter (t=>t.state==="To Do").forEach(element =>{})
        let claseFecha = compararFechas(tarea.DueDate) ? "FechaCumplida" : "FechaNoCumplida"
        if (tarea.State === "ToDo") {
            ToDo += `<div draggable="true" id="${tarea.Tittle}" class="ToDoTarea ${claseFecha}">`;
            ToDo += `<p>${tarea.Tittle}</p>`;
            if (tarea.Descripcion !== "") {
                ToDo += `<p>Descripcion: ${tarea.Descripcion}</p>`;
            }
            if (tarea.Members.length > 0) {
                ToDo += `<p>Miembros: ${tarea.Members}</p>`;
            }
            ToDo += `</div>`;
        }
        else if (tarea.State === "InProgress") {
            InProgress += `<div draggable="true" id="${tarea.Tittle}" class="${claseFecha}">`;
            InProgress += `<p>${tarea.Tittle}</p>`;
            if (tarea.Members.length > 0) {
                InProgress+= `<p>Miembros: ${tarea.Members}</p>`;
            }
            if (tarea.Descripcion !== "") {
                InProgress += `<p>Descripcion: ${tarea.Descripcion}</p><input type="checkbox" class="checks"></input>`;


            }
            InProgress += `</div>`;
        }

        else {
            Done += `<div draggable="true" id="${tarea.Tittle}" class="${claseFecha}">`;
            Done += `<p>${tarea.Tittle}</p>`;
            if (tarea.Members.length > 0) {
                Done += `<p>Miembros: ${tarea.Members}</p>`;
            }
            if (tarea.Descripcion !== "") {
                Done += `<p>Descripcion: ${tarea.Descripcion}</p>`;
            }
            Done += `</div>`;
        }
    });

    ToDoContainer.innerHTML = "<h1>ToDo</h1>" + ToDo;
    InProgressContainer.innerHTML = "<h1>InProgress</h1>" + InProgress;
    DoneContainer.innerHTML = "<h1>Done</h1>" + Done;

    //////////// Evento del check 
    let checkboxes = document.querySelectorAll(".checks");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                let tareaId = this.parentNode.id;
                let tareaIndex = tareas.findIndex(tarea => tarea.Tittle === tareaId && tarea.State === "InProgress");
                if (tareaIndex !== -1) {
                    tareas[tareaIndex].State = "Done";
                    mostrarDatos();
                }
            }
        });
    });
    
    document.body.insertAdjacentHTML('beforeend', '<div id="personasHTML"></div><br>');
    document.body.insertAdjacentHTML('beforeend', '<div id="tareasHTML"></div><br>');

    let ToDoContainerT = document.querySelectorAll(".ToDoTarea");
    let MiembrosContainer = document.querySelectorAll(".Tmiembros");

    let personasHTML = '';
    personas.forEach(persona => {
        personasHTML += `<div>Nombre: ${persona.Persona.Nombre}, Tareas Realizadas: ${persona.Persona.TareasR}, ID: ${persona.Persona.Id}, Trabajo: ${persona.trabajo}</div>`;
    });
    document.getElementById('personasHTML').innerHTML = personasHTML;

    let tareasHTML = '';
    tareas.forEach(tarea => {
        tareasHTML += `<div>Título: ${tarea.Tittle}, Descripción: ${tarea.Descripcion}, Fecha de Vencimiento: ${tarea.DueDate}, Miembros: ${tarea.Members}, Estado: ${tarea.State}</div>`;
    });
    document.getElementById('tareasHTML').innerHTML = tareasHTML;

    MiembrosContainer.forEach(function(container) {
        container.addEventListener("dragstart", handleDragStartMiembros);
    });
    
    ToDoContainerT.forEach(function(container) {
        container.addEventListener("drop", handleDropMiembros);
        container.addEventListener("dragover", handleDragOverMiembros);
    });

}
mostrarDatos();

///////Drag and drop
////Tareas
let ToDoContainer = document.querySelector(".ToDo");
ToDoContainer.addEventListener("dragstart", handleDragStartTareas);
ToDoContainer.addEventListener("dragover", handleDragOverTareas);
let InProgressContainer = document.querySelector(".InProgress");
InProgressContainer.addEventListener("drop", handleDropTareas);
InProgressContainer.addEventListener("dragover", handleDragOverTareas);

let Id = null;
function handleDragStartTareas(event) {
    Id = event.target.id;
    console.log(Id)
}
function handleDragOverTareas(event) {
    event.preventDefault();
    console.log(this.id)
}
function handleDropTareas(event) {
    event.preventDefault();
    if (Id) {
        let taskElement = document.getElementById(Id);
        let taskTitle = taskElement.querySelector("p").textContent;

        // Encontrar la tarea en el array de tareas y cambiar su estado a "InProgress"
        let taskIndex = tareas.findIndex(task => task.Tittle === taskTitle && task.State === "ToDo");
        if (tareas[taskIndex].Members.length > 0) {
            tareas[taskIndex].State = "InProgress";
            mostrarDatos();
        }

        Id = null;
    }
}

let IdMiembros = null;

function handleDragStartMiembros(event){
    IdMiembros = event.target.id;
    console.log(IdMiembros);
}

function handleDropMiembros(event){
    event.preventDefault();
    let nombreMiembro = personas.find(persona => persona.Persona.Id==IdMiembros);
    let taskIndex = tareas.findIndex(task => task.Tittle === this.id);
        if (taskIndex !== -1  && !tareas[taskIndex].Members.includes(nombreMiembro.Persona.Nombre)) {
            tareas[taskIndex].Members.push(nombreMiembro.Persona.Nombre);
            mostrarDatos();
        }
        IdMiembros 
    console.log(this.id);
}

function handleDragOverMiembros(event){
    event.preventDefault();
    console.log(this.id);
}


document.addEventListener("DOMContentLoaded", function () {
    let añadirTarea = document.querySelector('.formulario');
    añadirTarea.addEventListener('submit', function (event) {
        event.preventDefault();

        let TareaTitulo = document.getElementById('NTask').value;
        let TareaDescripcion = document.getElementById('Desc').value;
        let TareaDueDate = document.getElementById('Date').value;
        if(TareaDueDate !=="" && TareaTitulo!==""){
        let newTarea = {
            Tittle: TareaTitulo,
            Descripcion: TareaDescripcion,
            DueDate: TareaDueDate,
            Members: [],
            State: "ToDo",
        };
        tareas.push(newTarea);
        }
        document.getElementById('NTask').value = '';
        document.getElementById('Desc').value = '';
        document.getElementById('Date').value = '';
        mostrarDatos();
    });
});

function compararFechas(fechaString) {
    return new Date(fechaString) < new Date();
}


