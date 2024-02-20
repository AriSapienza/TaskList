class Task {
  date;
  task;

  constructor(value) {
    this.date = new Date();
    this.task = value;
  }
}

// Para armar el string de la fecha
function getDateFormat(date) {
  const year = date.getFullYear();
  const day = date.getDate();
  // const month = arrTask[0].date.getMonth();
  const month = new Intl.DateTimeFormat("es-AR", { month: "short" }).format(
    date
  );
  return `${year} • ${day} de ${month.toUpperCase()}`;
}

// Agrega una nueva tarea
function addTask(arrTask, textarea) {
  const newTask = new Task(textarea);
  arrTask.push(newTask);
}

//Renderiza las tareas
function render(arrTask) {
  if (!arrTask.length) {
    let template = document.querySelector("#emptyTask");
    let templateContent = template.content;
    let newItem = document.importNode(templateContent, true);
    document.querySelector("#task-list-container").appendChild(newItem);
  } else {
    document.querySelector("#task-list-container").replaceChildren();
    let idx = 0;
    for (const taskItem of arrTask) {
      // Select the template element
      let template = document.querySelector("#task");

      // Access the contents of the template
      let templateContent = template.content;

      // Create a new DOM element using the template
      let newItem = document.importNode(templateContent, true);

      // Update the text of the new element
      newItem.querySelector(".task").setAttribute("id", `task-${idx}`);
      newItem.querySelector(".task-content").textContent = taskItem.task;
      newItem
        .querySelector(".task-content")
        .setAttribute("id", `task-content-${idx}`);
      newItem.querySelector("#time").textContent = getDateFormat(taskItem.date);

      // Add the new element to the page
      document.querySelector("#task-list-container").appendChild(newItem);
      idx++;
    }
  }
}

function cargarListener(arrTask) {
  const buttonEditModal = document.querySelector(".button-edit");
  const buttonAddModal = document.querySelector(".button-add");
  const buttonModal = document.querySelector(".button-modal");
  const buttonTrigger = document.querySelector(".button-trigger");
  const modal = document.querySelector(".modal");

  const editTask = document.querySelectorAll(".edit-task");
  const deleteTask = document.querySelectorAll(".delete-task");

  const textArea = document.querySelector("#modal-data__textarea");

  editTask.forEach(function (editEl) {
    editEl.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("un flag en el eventlistenner");

      modal.classList.remove("modal--off");
      buttonTrigger.classList.add("button-trigger--off");

      buttonEditModal.classList.remove("button-edit--off");
      buttonAddModal.classList.add("button-add--off");

      const thisTaskID = editEl.parentNode.parentNode.parentElement.id;
      const positionEl = parseInt(thisTaskID.split("-")[1]);

      const dataTask = arrTask[positionEl].task;
      // console.log(dataTask)

      textArea.value = dataTask;

      // console.log(positionEl)

      // arrTask.splice(positionEl,1,textarea);
      const pContent = document.getElementById(`task-content-${positionEl}`);

      buttonEditModal.addEventListener("click", function () {
        arrTask[positionEl].task = textArea.value;

        
        pContent.textContent = textArea.value;
        textArea.value = "";
        
        console.log(pContent);
        console.log(positionEl)

        buttonEditModal.classList.add("button-edit--off");
        buttonAddModal.classList.remove("button-add--off");
        modal.classList.add("modal--off");
        buttonTrigger.classList.remove("button-trigger--off");
      });
    });
  });

  deleteTask.forEach(function (deleteEl) {
    deleteEl.addEventListener("click", (e) => {
      e.preventDefault();

      //Consigo los elementos de los containers en el cual estoy situado y su padre
      const thisTask = deleteEl.parentNode.parentNode.parentElement;
      const containerTask =
        deleteEl.parentNode.parentNode.parentElement.parentElement;

      //Consigo el ID del elemento cuyo evento se escucha
      const thisTaskID = deleteEl.parentNode.parentNode.parentElement.id;
      const positionEl = parseInt(thisTaskID.split("-")[1]);

      //Elimino los elementos HTML y el elemento del Array (DB)
      arrTask.splice(positionEl, 1);
      containerTask.removeChild(thisTask);
    });
  });
}

function main() {
  const buttonTrigger = document.querySelector(".button-trigger");
  const modal = document.querySelector(".modal");
  const buttonModal = document.querySelector(".button-modal");

  let arrTask = [];
  render(arrTask);

  buttonTrigger.addEventListener("click", (e) => {
    modal.classList.remove("modal--off");
    buttonTrigger.classList.add("button-trigger--off");
  });

  buttonModal.addEventListener("click", (e) => {
    const textarea = document.querySelector("#modal-data__textarea").value;
    addTask(arrTask, textarea);
    document.querySelector("#modal-data__textarea").value = "";
    render(arrTask);
    cargarListener(arrTask);
    console.log(arrTask);
    modal.classList.add("modal--off");
    buttonTrigger.classList.remove("button-trigger--off");
  });
}

main();
