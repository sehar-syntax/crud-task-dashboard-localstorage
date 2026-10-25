const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskListUI = document.getElementById('taskList');

// Main LocalStorage Array Initialize (READ initialization)
let tasks = JSON.parse(localStorage.getItem('queens_tasks')) || [];

// 1. READ: Purane saved tasks ko screen par load karna
function displayTasks() {
    taskListUI.innerHTML = ''; // Purani UI list clear karna
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // Dynamic structure with completion states (UPDATE UI status)
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}" onclick="toggleComplete(${index})">
                ${task.text}
            </span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        
        taskListUI.appendChild(li);
    });
}

// 2. CREATE: Naya task array aur database memory me save karna
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return alert('Task khali nahi chora ja sakta!');

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask); // Array me save kiya
    updateLocalStorage(); // Browser hard-drive sync code
    displayTasks(); // UI refresh code
    taskInput.value = ''; // Input clear
}

// 3. UPDATE: Task ka completion status reverse karna
window.toggleComplete = function(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    displayTasks();
};

// 4. DELETE: Element ko array aur storage se out karna
window.deleteTask = function(index) {
    tasks.splice(index, 1); // Specific index se task hatana
    updateLocalStorage();
    displayTasks();
};

// LocalStorage updater core machine component helper
function updateLocalStorage() {
    localStorage.setItem('queens_tasks', JSON.stringify(tasks));
}

// Event Listeners setup calls
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

// App initialize activation trigger state
displayTasks();
