const addBtn = document.querySelector("#add-btn");
const clearBtn = document.querySelector("#clear-btn");
const newTaskInput = document.querySelector("#task-input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = () => {
  countValue.innerText = taskCount;
};

const clearAllTasks = () => {
  tasksContainer.querySelectorAll(".task").forEach(task => task.remove());
  taskCount = 0;
  displayCount();
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";

  if (!taskName) {
    error.style.display = "block";
    return;
  }

  const task = document.createElement("div");
  task.className = "task";
  task.innerHTML = `
    <input type="checkbox" class="task-check">
    <span>${taskName}</span>
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash"></i></button>
  `;

  tasksContainer.appendChild(task);
  const deleteBtn = task.querySelector(".delete");
  deleteBtn.onclick = () => {
    task.remove();
    taskCount--;
    displayCount();
  };

  const editBtn = task.querySelector(".edit");
  editBtn.onclick = () => {
    newTaskInput.value = task.querySelector("span").innerText;
    task.remove();
    taskCount--;
    displayCount();
  };

  const checkBox = task.querySelector(".task-check");
  checkBox.onchange = () => {
    task.querySelector("span").classList.toggle("completed");
    taskCount += checkBox.checked ? -1 : 1;
    displayCount();
  };

  taskCount++;
  displayCount();
  newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAllTasks);
window.onload = () => {
  displayCount();
};