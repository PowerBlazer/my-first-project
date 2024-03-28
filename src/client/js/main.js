import { createTask, deleteTask, getTasksList } from "./api.js"

document.addEventListener('DOMContentLoaded', async () => {
    loadTasks();

    document.getElementById('create-button')
        .addEventListener('click', async () => {
            const taskTitleInput = document.getElementById('title-input');
            const taskStatusSelect = document.getElementById('status-select');
            const taskDescription = document.getElementById('description-input');

            if(taskStatusSelect.value === 'none'){
                alert('Не выбран статус');
                return;
            }

            if(!taskTitleInput.value || taskTitleInput.value?.length === 0){
                alert('Название не может быть пустым')
            }

            const newTaskResult = await createTask({
                title:taskTitleInput.value,
                status: taskStatusSelect.value,
                description: taskDescription.value
            });

            if(!newTaskResult.isSuccess){
                alert(newTaskResult.error);
            }

            loadTasks();
        })
})

async function loadTasks(){
    const tasksCatalogElement = document.querySelector('.tasks-catalog')
    const tasksResult = await getTasksList();

    if(!tasksResult.isSuccess){
        alert(tasksResult.error);
        return;
    }

    const groupedTasks = Object.entries(tasksResult.result.reduce((accumulator, task) => {
        const { status } = task;
        accumulator[status] = accumulator[status] || []; 
        accumulator[status].push(task);
        return accumulator;
    }, {}))
    .map(([status, tasksObj]) => ({
        status,
        tasks: tasksObj
    }))
    .sort((a, b) => {
        if (a.status === 'Pending') return -1;
        if (b.status === 'Pending') return 1;
        if (a.status === 'In Progress') return -1;
        if (b.status === 'In Progress') return 1;
        return 0;
    });

    tasksCatalogElement.innerHTML = "";
    groupedTasks.forEach(groupTasks => {
        const groupTasksElement = createTasksGroupElement(
            groupTasks, 
            async (task, button) => {
                const deleteResult = await deleteTask(task.id);

                if(!deleteResult.isSuccess){
                    alert(deleteResult.error);
                    return;
                }

                button.remove();

                tasksCatalogElement
                    .querySelectorAll(".tasks-group")
                    .forEach(taskGroup => {
                        const tasksListElement = taskGroup.querySelector('.tasks-list');

                        if(tasksListElement?.children?.length === 0){
                            taskGroup.remove();
                        }
                    })
            }
        );

        tasksCatalogElement.appendChild(groupTasksElement);
    })

}


function createTaskElement(task, deleteAction){
    const taskItemDiv = document.createElement('li');
    taskItemDiv.className = 'task-item';

    const taskNameH3 = document.createElement('h3');
    taskNameH3.className = 'task-name';
    taskNameH3.innerText = task.title;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-delete';
    deleteButton.innerText = 'Remove'
    deleteButton.onclick = () => deleteAction(task, taskItemDiv)

    taskItemDiv.appendChild(taskNameH3);
    taskItemDiv.appendChild(deleteButton);

    return taskItemDiv;
}


function createTasksGroupElement(groupTasks, deleteAction){
    const tasksGroupDiv = document.createElement("div");
    tasksGroupDiv.className = 'tasks-group'

    const groupNameDiv = document.createElement("div");
    groupNameDiv.className = 'group-name';
    groupNameDiv.innerText = groupTasks.status;

    switch (groupTasks.status) {
        case "In Progress":
            groupNameDiv.style.color = "orange"
            break;
        case "Pending":
            groupNameDiv.style.color = "gray"
            break;
        case "Completed":
            groupNameDiv.style.color = "lightgreen"
            break;
        default:
            break;
    }

    const tasksListUl = document.createElement("ul");
    tasksListUl.className = 'tasks-list';

    groupTasks.tasks.forEach(task => {
        const taskElement = createTaskElement(task, deleteAction);

        tasksListUl.appendChild(taskElement);
    })

    tasksGroupDiv.appendChild(groupNameDiv);
    tasksGroupDiv.appendChild(tasksListUl);

    return tasksGroupDiv;
}