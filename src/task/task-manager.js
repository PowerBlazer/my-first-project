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
}

export default TaskManager;