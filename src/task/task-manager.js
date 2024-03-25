import { readFileSync } from 'fs';
import Task from './task.js';
import EventEmitter from 'events';
import fs from 'fs';
import { TaskModel } from './taskModel.js';

const PATH_TASKS_JSON = './task/tasks.json'

class TaskManager extends EventEmitter {
    constructor() {
        super();
        this.tasks = [];
    }

    loadTasks() {
        try {
            const data = readFileSync(PATH_TASKS_JSON, 'utf8');
            const tasksData = JSON.parse(data);

            this.tasks = tasksData.map(taskData =>{
                const task = new Task(taskData.id, taskData.description, taskData.status);
                const newTask = new TaskModel(task);

                newTask.save();
                
                return newTask;
            });
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
        this.emit('taskAdded', newTask);
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);

        if (index !== -1) {
            const deletedTask = this.tasks.splice(index, 1)[0];
            this.saveTasks();
            this.emit('taskDeleted', deletedTask);
        }
    }
}

export default TaskManager;