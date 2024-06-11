//TAREAS Y RECURSOS VARIOS
var task = [
    {
        title: "test task to do",
        description: "this is a test for check it's working",
        members: [],
        creationDate: 1710409507000,
        dueDate: new Date(Date.now() + 30000),
        state: "To Do"
    },
    {
        title: "test task to do 2",
        description: "this is a test for check it's working 2",
        members: [],
        creationDate: 1710409507000,
        dueDate: new Date(Date.now() + 30000),
        state: "To Do"
    },
    {
        title: "test task in progress",
        description: "this is a test for check it's working",
        members: [0],
        creationDate: 1710409507000,
        dueDate: new (Date.now() + 30000),
        state: "In Progress"
    },
    {
        title: "test task in progress 2",
        description: "this is a test for check it's working",
        members: [0],
        creationDate: 1710409507000,
        dueDate: new Date(Date.now() + 30000),
        state: "In Progress"
    },
    {
        title: "test task done",
        description: "this is a test for check it's working",
        members: [],
        creationDate: 1710409507000,
        dueDate: new Date(Date.now() + 30000),
        state: "Done"
    },
    {
        title: "test task done 2",
        description: "this is a test for check it's working",
        members: [],
        creationDate: 1710409507000,
        dueDate: new Date(Date.now() + 30000),
        state: "Done"
    }
];
var members = [{ name: "testMember", photo: "https://i.pinimg.com/236x/dc/9d/a6/dc9da660ea5779179669e6e49452d99e.jpg", id: 0, tasksDone: 0 },{ name: "testMember2", photo: "https://img1.freepnges.com/20180713/aaw/kisspng-user-profile-linkedin-netwerk-money-order-fulfillm-round-face-5b494408cd2468.5239235115315282008403.jpg", id: 1, tasksDone: 0 }];
var idCount = 1;
var elementDragged;
var memberDragged;
//EVENTS
let makeTask = document.getElementById("btnMT");
makeTask.addEventListener("click",addTask);


//CONSTRUCTORES
function Task(title, description) {
    this.title = title;
    this.description = description;
    this.members = [];
    this.creationDate =new (Date.now());
    this.dueDate = 1;
    this.state = "To Do";
}
//ADD TASKS FUNCTIONS
function addTask() {
    let ntaks = document.getElementById("ntask");
    let descr = document.getElementById("descr");

    task.push(new Task(ntaks.value, descr.value));
    drawToDo();
}

//FUNCIONES DE PINTAR
function drawToDo() {
    let taskContainerToDo = document.getElementById("taskContainerToDo");
    let count=0;
    taskContainerToDo.innerHTML ="";
    task.forEach(element => {
        if (element.state === "To Do") {
            let textToWrite = [`<div draggable="true" title="${element.title}"> title: ${element.title}<br> descrition: ${element.description} `];
            element.members.forEach(member=>{
            textToWrite.push(`<img width="20px" src="${members.find(memberFinding=>memberFinding.id == member).photo}">`);
            });
            textToWrite.push("</div>");
            taskContainerToDo.innerHTML += textToWrite.join('');
            count++;
        }
    });

    //manejo eventos
    taskContainerToDo.addEventListener("dragstart", event=> {
        elementDragged = event.target.getAttribute("title");
    })
    taskContainerToDo.addEventListener("dragover",event=>event.preventDefault());
    taskContainerToDo.addEventListener("drop", event=>{
        let titleTarget = event.target.getAttribute("title");
        let taskTarget = task.find(element=> element.title==titleTarget);
        if(!taskTarget.members.includes(memberDragged)){
            taskTarget.members.push(memberDragged);
        }
        drawToDo();
    })
    //ahora asigno el numero de tareas
    let numeroTareas = document.getElementById("tD");
    numeroTareas.innerHTML=count;
}

function drawProgress() {
    let taskContainerProgress = document.getElementById("taskContainerProgress");
    let count = 0;
    taskContainerProgress.innerHTML = "";
    task.forEach(element => {
        if (element.state === "In Progress") {
            let textToWrite = [`<div title="${element.title}"> title: ${element.title}<br> descrition: ${element.description} <input type="checkbox">`];
            element.members.forEach(id => drawMember(id, textToWrite));
            textToWrite.push('</div>');
            taskContainerProgress.innerHTML += textToWrite.join('');
            count++;
        }
    })
    //manejo eventos
    taskContainerProgress.addEventListener("dragover",event => event.preventDefault());
    taskContainerProgress.addEventListener("drop", event=> {
        event.preventDefault();
        task.find(oneTask => oneTask.title == elementDragged).state="In Progress";
        drawProgress();
        drawToDo();
    })
    taskContainerProgress.addEventListener("change", event =>{
        let titleTarget = event.target.parentElement.getAttribute("title");
        let taskTarget = task.find(oneTask=>oneTask.title == titleTarget);
        taskTarget.state = "Done";

        drawDone();
        drawProgress();
        drawMembers();
    })
    //ahora asigno el numero de tareas
    let numeroTareas = document.getElementById("iP");
    numeroTareas.innerHTML=count;
}

function drawDone() {
    var taskContainerDone = document.getElementById("taskContainerDone");
    let count =0;
    taskContainerDone.innerHTML = "";//esto se podría hacer mejor con el filter
    task.forEach(element => {
        if (element.state === "Done") {
            taskContainerDone.innerHTML += `<div> title: ${element.title}<br> descrition: ${element.description}</div>`;
            members.filter(member=> element.members.includes(member.id)).forEach(member=> member.tasksDone++);
            count++;
        }
    })
    //asigno el numero de tareas
    let numeroTareas = document.getElementById("d");
    numeroTareas.innerHTML=count;
}

function drawMembers(){
    let membersContainer = document.getElementById("teamMembers");
    membersContainer.innerHTML=""; 

    members.forEach(element=>{
        
            membersContainer.innerHTML+=`<span> name: ${element.name} <img id="${element.id}" draggable="true" width="20px" src=${element.photo}> tasks done: ${element.tasksDone} // </span>`;
        
    })
    membersContainer.addEventListener("dragstart",event=>{
        memberDragged = event.target.getAttribute("id");
    })
}

function drawMember(id, toWrite) {
    members.filter(member => member.id == id).forEach(member => {
        toWrite.push(`<span><img width="20px" src=${member.photo}></span>`);
    });
}

function drawAll() {
    drawDone();
    drawProgress();
    drawToDo();
    drawMembers();
}
//para controlar que una tarea se termina
function controlarTareas() {
    setInterval(() => {
        task.forEach(element => {
            if (element.dueDate <= new Date.now()) {
                // Comprobamos el estado de la tarea y la actualizamos según corresponda
                if (element.state == "To Do") {
                    let targetContainer = document.querySelectorAll("#taskContainerToDo div");
                    targetContainer.find(div => div.getAttribute("title") == element.title).style.backgroundColor = "red";
                    drawToDo();
                } else if (element.state == "In Progress") {
                    let targetContainer = document.querySelectorAll("#taskContainerProgress div");
                    targetContainer.find(div => div.getAttribute("title") == element.title).style.backgroundColor = "red";
                    drawProgress();
                } else if (element.state == "Done") {
                    let targetContainer = document.querySelectorAll("#taskContainerDone div");
                    targetContainer.find(div => div.getAttribute("title") == element.title).style.backgroundColor = "red";
                    drawDone();
                }
                
            }
        });
    }, 1000); // La función se ejecutará cada segundo
} 
controlarTareas();
drawAll();

