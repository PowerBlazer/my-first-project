import TaskManager from "./task/task-manager.js";

const taskManager = new TaskManager();

taskManager.on('taskAdded', (task) => {
    console.log(`Task added: ${task.toString()}`);
});


taskManager.on('taskDeleted', (task) => {
    console.log(`Task deleted: ${task.toString()}`);
});

taskManager.loadTasks();
taskManager.addTask(5, 'Study for exam', 'In Progress');
taskManager.deleteTask(1);