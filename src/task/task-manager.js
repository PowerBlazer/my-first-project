import { readFileSync } from 'fs';
import Task from './task.js';

const PATH_TASKS_JSON = './task/tasks.json'

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    loadTasks() {
        try {
            const data = readFileSync(PATH_TASKS_JSON, 'utf8');
            const tasksData = JSON.parse(data);

            this.tasks = tasksData.map(task => new Task(task.id, task.description, task.status));
        } catch (err) {
            console.error('Error loading tasks:', err);
        }
    }

    printTasks() {
        this.tasks.forEach(task => console.log(task.toString()));
    }

    saveTasks() {
        try {
            const tasksData = JSON.stringify(this.tasks, null, 2);
            fs.writeFileSync(PATH_TASKS_JSON, tasksData);
        } catch (err) {
            console.error('Error saving tasks:', err);
        }
    }

    addTask(id, description, status) {
        const newTask = new Task(id, description, status);
        this.tasks.push(newTask);
        this.saveTasks();
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);

        if (index !== -1) {
            this.tasks.splice(index, 1);
            this.saveTasks();
        }
    }
}

export default TaskManager;