import { readFileSync } from 'fs';
import { TaskModel } from './taskModel.js';
import Task from './task.js';
import EventEmitter from 'events';

const PATH_TASKS_JSON = './task/tasks.json'

class TaskManager extends EventEmitter {
    constructor() {
        super();
    }

    async loadTasks() {
        try {
            const data = readFileSync(PATH_TASKS_JSON, 'utf8');
            const tasksData = JSON.parse(data);

            tasksData.forEach(async taskData => {
                const task = new Task(
                    taskData.id, 
                    taskData.description, 
                    taskData.status, 
                    taskData.title
                );
                
                const newTask = new TaskModel(task);

                await newTask.save();
            });

        } catch (err) {
           throw new Error(err);
        }
    }

    async addTask(task) {
        const taskModel = new TaskModel(task);
    
        try {
            return await taskModel.save();
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteTask(id) {
        try {
            const deleteResult = await TaskModel.deleteOne({ id: id });

            if(deleteResult.deletedCount === 0){
                throw new Error(`Task with id ${id} not found.`)
            }

        } catch (error) {
            throw new Error(error)
        }
        
    }

    async getTasks(){
        try {
            const tasks = await TaskModel.find();
            
            return tasks.map(task => new Task(task.id, task.description, task.status, task.title));

        } catch (error) {
            throw new Error(error)
        }
    }
}




export default TaskManager;