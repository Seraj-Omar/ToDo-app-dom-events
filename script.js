const taskInput = document.querySelector('.task-input');
const addBtn = document.querySelector('.add-btn');
const tasksContainer = document.querySelector('.tasks-container');

function validInput(str) {
    return str.trim();
}

function createTag(tag, type = '') {
    const element = document.createElement(tag);
    if (type) 
        element.type = type;
    return element;
}

function addClass(el, className) {
    el.classList.add(className);
    return el;
}

function removeClass(el, className) {
    el.classList.remove(className);
    return el;
}

function addEvent(el, event, callback) {
    el.addEventListener(event, callback);
    return el;
}

function changeTextContent(el, newText) {
    el.textContent = newText;
    return el;
}

function changeValue(el, newValue) {
    el.value = newValue;
    return el;
}

function appendElementsToContainer(container, ...elements) {
    container.append(...elements);
    return container;
}

function createTask(text) {
    const task = addClass(createTag('div'), 'task-element');

    const checkbox = addEvent(createTag('input', 'checkbox'),'change'
    ,function () {
            if (this.checked)
                addClass(task, 'completed-task');
            else
                removeClass(task, 'completed-task');
        }
    );

    const par = changeTextContent(addClass(createTag('p'), 'task-content'),text);

    const checkAndP = appendElementsToContainer(createTag('div'), checkbox, par);

    const delBtn = addEvent(changeTextContent(addClass(createTag('button'), 'delete-btn'), 'Delete'),'click',() => task.remove());

    appendElementsToContainer(task, checkAndP, delBtn);

    return task;
}

function addTask(input) {
    const validatedInput = validInput(input.value);
    if (!validatedInput) 
        return;

    changeValue(input, ''); 

    const newTask = createTask(validatedInput);
    appendElementsToContainer(tasksContainer, newTask);
}

addBtn.addEventListener('click', () => addTask(taskInput));

taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask(taskInput);
    }
});
