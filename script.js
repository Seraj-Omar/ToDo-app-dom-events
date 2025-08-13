const addBtn=document.getElementById("add-task-btn");
const tasksContainer=document.getElementById("tasks-container");
const taskInput=document.getElementById("task-input");

function addTask(){
    const inputValue=taskInput.value.trim();
    if(!inputValue)
        return;
    taskInput.value="";

    const newDiv=document.createElement('div');
    newDiv.classList.add("task-element");

    const newCheck=document.createElement('input')
    newCheck.type='checkbox';
    newDiv.appendChild(newCheck);
    newCheck.addEventListener("change",()=>{
        if(newCheck.checked){
            newDiv.style.backgroundColor="#b4aaaaff";
            newDiv.style.textDecoration='line-through';
        }
        else{
            newDiv.style.backgroundColor="";
            newDiv.style.textDecoration='';
        }
    });

    const newp=document.createElement('p');
    newp.classList.add('task-content');
    newp.textContent=inputValue;
    newDiv.appendChild(newp);

    const delBtn=document.createElement('button');
    delBtn.classList.add('delete-btn');
    delBtn.textContent='Delete';
    delBtn.addEventListener("click", () => {
        newDiv.remove();
    });

    newDiv.appendChild(delBtn);

    document.body.appendChild(newDiv);
}

addBtn.addEventListener("click",addTask);
taskInput.addEventListener("keydown",function(event){
    if(event.key==='Enter')
        addTask();
});
