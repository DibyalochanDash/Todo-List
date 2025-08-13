const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add new task
addTaskBtn.addEventListener('click', function () {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert("Please enter a task.");
    return;
  }

  addTask(taskText);
  saveTask(taskText);
  taskInput.value = '';
});

// Add task to DOM
function addTask(taskText) {
  const li = document.createElement('li');
  li.className = 'list-group-item';

  li.innerHTML = `
    <span>${taskText}</span>
    <button class="btn btn-sm btn-danger delete-btn">Delete</button>
  `;

  taskList.appendChild(li);

  li.querySelector('.delete-btn').addEventListener('click', function () {
    li.remove();
    removeTask(taskText);
  });
}

// Save task to localStorage
function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTask(taskToRemove) {
  let tasks = getTasks();
  tasks = tasks.filter(task => task !== taskToRemove);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Load tasks into DOM
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(addTask);
}
