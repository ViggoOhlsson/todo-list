class Task {
    constructor (title, prio) {
        this.title = title;
        this.prio = prio;
        this.finished = false;
        this.startedAt = getTime();
        this.finishedAt;
    }
}
if (localStorage.getItem("sortBy") === null) {
    localStorage.setItem("sortBy", "latest");
}
let sortBy = localStorage.getItem("sortBy");
let tasks = [];
tasks = JSON.parse(localStorage.getItem("tasks"));

if (tasks === null) {
    // tasks = [new Task("This is what a Task looks like, feel free to remove it.", "1")];
    // tasksToLocalStorage();
    tasks = [];
}
if (tasks.length == 0) {
    // tasks = [new Task("This is what a Task looks like, feel free to remove it.", "1")];
    // tasksToLocalStorage();
    tasks = [];
}
window.onload = function () {
    Main();
}
function Main() {
    refreshAllTasks();
    clock();

    let buttonLatest = document.getElementById("buttonLatest");
    let buttonOldest = document.getElementById("buttonOldest");
    buttonLatest.addEventListener("click", () => {
        localStorage.setItem("sortBy", "latest");
        sortBy = localStorage.getItem("sortBy");
        refreshAllTasks();
    });
    buttonOldest.addEventListener("click", () => {
        localStorage.setItem("sortBy", "oldest");
        sortBy = localStorage.getItem("sortBy");
        refreshAllTasks();
    });


    //Modal Toggle 
    let toggleModalButton = document.getElementById("showModalButton");
    let addModal = document.getElementById("addModal");
    toggleModalButton.addEventListener("click", () => {
        if (addModal.style.display == "none") {
            addModal.style.display = "block";
        } else {
            addModal.style.display = "none";
        }
    });
    document.getElementById("modalClose").addEventListener("click", () => {addModal.style.display = "none";})

    //range display in modal
    let range = document.getElementById("range");
    let rangeOutput = document.getElementById("rangeOutput");
    rangeOutput.innerHTML = range.value;
    range.addEventListener("change", () => {
        rangeOutput.innerHTML = range.value;
    });

    //add task stuff
    let addForm = document.getElementById("addForm");
    addForm.addEventListener("submit", () => {
        let formTitle = document.getElementById("formTitle").value;
        let formPrio = document.getElementById("range").value;
        if (formTitle != "" && formPrio >= 1 && formPrio <= 3) {
            let newTask = new Task(formTitle, formPrio);
            tasks.push(newTask);
            tasksToLocalStorage();
            refreshAllTasks();
            formPrio = 2;
            formTitle = null;
            addModal.style.display = "none";
        }
    });
}

function refreshAllTasks() {
    refreshActiveTasks();
    refreshFinishedTasks();
}

function refreshActiveTasks() {
    let list = document.getElementById("activeTasks");
    list.innerHTML = "";
    switch (sortBy) {
        case "oldest":
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].finished == false) {
                    let task = document.createElement("div");
                    task.classList.add ("task", "active-task");

                    let taskFinish = document.createElement("button");
                    taskFinish.className = "task-toggle";
                    taskFinish.innerHTML = "<i class='fa fa-check'></i>";
                    taskFinish.addEventListener("click", () => {
                        tasks[i].finished = true;
                        tasks[i].finishedAt = getTime();
                        refreshAllTasks();
                        tasksToLocalStorage();
                    })
                    task.appendChild(taskFinish);

                    let taskTitle = document.createElement("span");
                    taskTitle.className = "task-title";
                    taskTitle.innerHTML = tasks[i].title;
                    task.appendChild(taskTitle);

                    let taskStartedAt = document.createElement("span");
                    taskStartedAt.className = "task-started-at";
                    taskStartedAt.innerHTML = "Started At <span>" + tasks[i].startedAt + "</span>";
                    task.appendChild(taskStartedAt);

                    let taskPrio = document.createElement("span");
                    taskPrio.className = "task-prio";
                    let prioClass;
                    switch (tasks[i].prio) {
                        case "1":
                            prioClass = "one";
                            break;
                        case "2":
                            prioClass = "two";
                            break;
                        case "3":
                            prioClass = "three";
                            break;
                        default:
                            prioClass = "three";
                            break;
                    }
                    taskPrio.innerHTML = "Priority <span class=" + prioClass + ">" + tasks[i].prio + "</span>";
                    task.appendChild(taskPrio);
                    list.appendChild(task);
                }  
            }
            break;
        case "latest":
        default: 
            for (let i = tasks.length-1; i >= 0; i--) {
                if (tasks[i].finished == false) {
                    let task = document.createElement("div");
                    task.classList.add ("task", "active-task");

                    let taskFinish = document.createElement("button");
                    taskFinish.className = "task-toggle";
                    taskFinish.innerHTML = "<i class='fa fa-check'></i>";
                    taskFinish.addEventListener("click", () => {
                        tasks[i].finished = true;
                        tasks[i].finishedAt = getTime();
                        refreshAllTasks();
                        tasksToLocalStorage();
                    })
                    task.appendChild(taskFinish);

                    let taskTitle = document.createElement("span");
                    taskTitle.className = "task-title";
                    taskTitle.innerHTML = tasks[i].title;
                    task.appendChild(taskTitle);

                    let taskStartedAt = document.createElement("span");
                    taskStartedAt.className = "task-started-at";
                    taskStartedAt.innerHTML = "Started At <span>" + tasks[i].startedAt + "</span>";
                    task.appendChild(taskStartedAt);

                    let taskPrio = document.createElement("span");
                    taskPrio.className = "task-prio";
                    let prioClass;
                    switch (tasks[i].prio) {
                        case "1":
                            prioClass = "one";
                            break;
                        case "2":
                            prioClass = "two";
                            break;
                        case "3":
                            prioClass = "three";
                            break;
                        default:
                            prioClass = "three";
                            break;
                    }
                    taskPrio.innerHTML = "Priority <span class=" + prioClass + ">" + tasks[i].prio + "</span>";
                    task.appendChild(taskPrio);
                    list.appendChild(task);
                }  
            }
            break;
    }
}
function refreshFinishedTasks() {
    let list = document.getElementById("finishedTasks");
    list.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].finished) {
            let task = document.createElement("div");
            task.classList.add ("task", "finished-task");

            let taskRemove = document.createElement("button");
            taskRemove.className = "task-remove";
            taskRemove.innerHTML = "<i class='fa fa-trash'></i>"
            taskRemove.addEventListener("click", () => {
                if (confirm("Are you sure you want to remove this task?")) {
                    tasks.splice(i, 1);
                    refreshAllTasks();
                    tasksToLocalStorage();
                }
            });
            task.appendChild(taskRemove);

            let taskRestart = document.createElement("button");
            taskRestart.className = "task-toggle";
            taskRestart.innerHTML = "<i class='fa fa-undo'></i>";
            taskRestart.addEventListener("click", () => {
                tasks[i].finished = false;
                tasks[i].startedAt = getTime();
                refreshAllTasks();
                tasksToLocalStorage();
            });
            task.appendChild(taskRestart);

            let taskTitle = document.createElement("span");
            taskTitle.className = "task-title";
            taskTitle.innerHTML = tasks[i].title;
            task.appendChild(taskTitle);

            let taskFinishedAt = document.createElement("span");
            taskFinishedAt.className = "task-finished-at";
            taskFinishedAt.innerHTML = "Finished At <span>" + tasks[i].finishedAt + "</span>";
            task.appendChild(taskFinishedAt);

            // let taskPrio = document.createElement("span");
            // taskPrio.className = "task-prio";
            // let prioClass;
            // switch (tasks[i].prio) {
            //     case "1":
            //         prioClass = "one";
            //         break;
            //     case "2":
            //         prioClass = "two";
            //         break;
            //     case "3":
            //         prioClass = "three";
            //         break;
            //     default:
            //         prioClass = "three";
            //         break;
            // }
            // taskPrio.innerHTML = "Priority <span class=" + prioClass + ">" + tasks[i].prio + "</span>";
            // task.appendChild(taskPrio);
            list.appendChild(task);
        }  
    }
}

function tasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTime() {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    m = addZeroes(m);
    s = addZeroes(s);
    let time = h + ":" + m + ":" + s;
    return time;

}

function clock() {
    document.getElementById('clock').innerHTML = getTime();
    setTimeout(clock, 1000);
}
  
function addZeroes(i) {
    if (i < 10) {i = "0" + i};
    return i;
}