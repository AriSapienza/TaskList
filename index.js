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
      newItem.querySelector("#task-content").textContent = taskItem.task;
      newItem.querySelector("#time").textContent = getDateFormat(taskItem.date);

      // Add the new element to the page
      document.querySelector("#task-list-container").appendChild(newItem);
      idx++;
    }
  }
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
    modal.classList.add("modal--off");
    buttonTrigger.classList.remove("button-trigger--off");
  });
}

main();
