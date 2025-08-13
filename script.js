const addBtn=document.getElementById("add-task-btn");
const tasksContainer=document.getElementById("tasks-container");
const taskInput=document.getElementById("task-input");

function addTask(){
    const inputValue=taskInput.value.trim();
    if(!inputValue)
        return;
    taskInput.value="";

    const newTask=document.createElement('div');
    newTask.classList.add("task-element");

    const checkAndPContainer=document.createElement('div');
    
    const newCheck=document.createElement('input')
    newCheck.classList.add('check-completed')
    newCheck.type='checkbox';
    checkAndPContainer.appendChild(newCheck);
    newCheck.addEventListener("change",()=>{
        if(newCheck.checked){
            newTask.style.backgroundColor="#b4aaaaff";
            newTask.style.textDecoration='line-through';
            newTask.style.opacity=0.7;
        }
        else{
            newTask.style.backgroundColor="";
            newTask.style.textDecoration='';
            newTask.style.opacity=1;
        }
    });

    const newp=document.createElement('p');
    newp.classList.add('task-content');
    newp.textContent=inputValue;
    checkAndPContainer.appendChild(newp);

    newTask.appendChild(checkAndPContainer);
    const delBtn=document.createElement('button');
    delBtn.classList.add('delete-btn');
    delBtn.textContent='Delete';
    delBtn.addEventListener("click", () => {
        newTask.remove();
    });

    newTask.appendChild(delBtn);

    tasksContainer.appendChild(newTask);
}

addBtn.addEventListener("click",addTask);
taskInput.addEventListener("keydown",function(event){
    if(event.key==='Enter')
        addTask();
});
