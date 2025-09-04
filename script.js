const taskInput = document.querySelector('.task-input');
const addBtn = document.querySelector('.add-btn');
const tasksContainer = document.querySelector('.tasks-container');

//validate the task input
function validInput(str) {
    return str.trim();
}

//create a new tag and decide its type if needed
function createTag(tag, type = '') {
    const element = document.createElement(tag);
    if (type) element.type = type;
    return element;
}

//add a css class to the element 
function addClass(el, className) {
    el.classList.add(className);
    return el;
}

//remove a css class from the element
function removeClass(el, className) {
    el.classList.remove(className);
    return el;
}

//adding event to elements using event name and a callback function
function addEvent(el, event, callback) {
    el.addEventListener(event, callback);
    return el;
}

//change the text content of an element 
function changeTextContent(el, newText) {
    el.textContent = newText;
    return el;
}

//change the value of an element
function changeValue(el, newValue) {
    el.value = newValue;
    return el;
}

//append an element or more to a specific container 
function appendElementsToContainer(container, ...elements) {
    container.append(...elements);
    return container;
}

//======local Storage helpers=====

function getFromLocal(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (err) {
        console.error("Error reading from localStorage:", err);
        return [];
    }
}

function saveToLocal(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error("Error saving to localStorage:", err);
    }
}

function addToLocal(task) {
    let tasksArray = getFromLocal('tasks');
    tasksArray.push(task);
    saveToLocal('tasks', tasksArray);
}

function removeFromLocal(id) {
    let tasksArray = getFromLocal('tasks');
    tasksArray = tasksArray.filter(task => task.id !== id);
    saveToLocal('tasks', tasksArray);
}

function updateStatus(id, status) {
    let tasksArray = getFromLocal('tasks');
    const task = tasksArray.find(t => t.id === id);
    if (task) {
        task.completed = status;
        saveToLocal('tasks', tasksArray);
    }
}


//=====Counter for generating a unique id for each task======
function getCounter() {
    return parseInt(localStorage.getItem('taskCounter') || '0', 10);
}

function incrementCounter() {
    let counter = getCounter() + 1;
    localStorage.setItem('taskCounter', counter);
    return counter;
}


//=====Creation of tasks=====
function createTask(taskObj) {
    const task = addClass(createTag('div'), 'task-element');
    task.dataset.id = taskObj.id;

    if (taskObj.completed) addClass(task, 'completed-task');

    const checkbox = createTag('input', 'checkbox');
    checkbox.checked = taskObj.completed;

    const par = changeTextContent(addClass(createTag('p'), 'task-content'), taskObj.text);

    const checkAndP = appendElementsToContainer(addClass(createTag('div'), 'check-par-container'), checkbox, par);

    const delBtn = changeTextContent(addClass(createTag('button'), 'delete-btn'), 'Delete');

    appendElementsToContainer(task, checkAndP, delBtn);
    return task;
}


//=======Event Delegation======
addEvent(tasksContainer, 'click', (e) => {
    const taskEl = e.target.closest('.task-element');
    if (!taskEl) return;

    const taskId = parseInt(taskEl.dataset.id, 10);

    if (e.target.matches('.delete-btn')) {
        removeFromLocal(taskId);
        taskEl.remove();
    }
});

addEvent(tasksContainer, 'change', (e) => {
    if (e.target.type === 'checkbox') {
        const taskEl = e.target.closest('.task-element');
        const taskId = parseInt(taskEl.dataset.id, 10);

        if (e.target.checked) {
            addClass(taskEl, 'completed-task');
            updateStatus(taskId, true);
        } else {
            removeClass(taskEl, 'completed-task');
            updateStatus(taskId, false);
        }
    }
});


//==== Managing tasks ====
function addTask(input) {
    const validatedInput = validInput(input.value);
    changeValue(input, '');
    if (!validatedInput) return;

    const taskObj = {
        id: incrementCounter(),
        text: validatedInput,
        completed: false
    };

    addToLocal(taskObj);
    const newTask = createTask(taskObj);
    appendElementsToContainer(tasksContainer, newTask);
}


//==== Page Load ====
window.onload = () => {
    const tasksArray = getFromLocal('tasks');
    tasksArray.forEach(taskObj => {
        const taskElement = createTask(taskObj);
        appendElementsToContainer(tasksContainer, taskElement);
    });
};


//==== Input Listeners ====
addEvent(addBtn, 'click', () => addTask(taskInput));

addEvent(taskInput, 'keydown', (event) => {
    if (event.key === 'Enter') {
        addTask(taskInput);
    }
});
