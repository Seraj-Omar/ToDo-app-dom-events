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
    if (type) 
        element.type = type;
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

//save items in local storage in the wanted key
function saveToLocal(key,value){
    localStorage.setItem(key,JSON.stringify(value));
}

//add task to local storage in the wanted key
function addToLocal(task){
    let tasksArray=getFromLocal('tasks');
    tasksArray.push(task);
    saveToLocal('tasks',tasksArray);
}

//get the value of a specific key from local storage
function getFromLocal(key){
    return JSON.parse(localStorage.getItem(key))||[];
}

//remove a specific value from a specific key in local storage
function removeFromLocal(task){
    let tasksArray=getFromLocal('tasks');
    const idx=Array.from(tasksContainer.children).indexOf(task);
    tasksArray.splice(idx,1);
    saveToLocal('tasks',tasksArray);
}

//control the status of a task in local storage (complete,uncomplete)
function updateStatus(idx,status){
    // saveToLocal(getFromLocal()[idx].completed=status);
    let tasksArray=getFromLocal('tasks');
    tasksArray[idx].completed=status;
    saveToLocal('tasks',tasksArray);
}

//create the desired task 
function createTask(text,status=false) {
    const task = addClass(createTag('div'), 'task-element');
    if(status)
        addClass(task,'completed-task');

    const checkbox = createTag('input', 'checkbox');
    checkbox.checked = status;

    addEvent(checkbox, 'change', function () {
        const idx = Array.from(tasksContainer.children).indexOf(task);
        if (this.checked) {
            addClass(task, 'completed-task');
            updateStatus(idx, true);
        } else {
            removeClass(task, 'completed-task');
            updateStatus(idx, false);
        }
    });

    const par = changeTextContent(addClass(createTag('p'), 'task-content'),text);

    const checkAndP = appendElementsToContainer(addClass(createTag('div'),'check-par-container'), checkbox, par);

    //attach an event to the delete button of a task to handle the deletion of a task
    const delBtn = addEvent(changeTextContent(addClass(createTag('button'), 'delete-btn'), 'Delete'),
    'click',() => {
        removeFromLocal(task);
        task.remove()
    });

    appendElementsToContainer(task, checkAndP, delBtn);

    return task;
}

//validate the input then add the task to the tasks container and to the local storage
function addTask(input) {
    const validatedInput = validInput(input.value);
    changeValue(input, ''); 
    if (!validatedInput) 
        return;

    const taskObj={
        text:validatedInput,
        completed:false
    };
    addToLocal(taskObj);
    const newTask = createTask(taskObj.text,taskObj.completed);
    appendElementsToContainer(tasksContainer, newTask);
}

//when the page loads display the tasks in local storage if exist
window.onload = () => {
    const tasksArray = getFromLocal('tasks');
    tasksArray.forEach(taskObj => {
        const taskElement = createTask(taskObj.text,taskObj.completed);
        appendElementsToContainer(tasksContainer, taskElement);
    });
};

//add click event to the add button
addBtn.addEventListener('click', () => addTask(taskInput));

//adding an event for pressing enter after typing the task 
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask(taskInput);
    }
});
