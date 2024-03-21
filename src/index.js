import {default as chalk} from "chalk";
import Task from './task.js';

const tasks = [
    {
        title:"Complete homework",
        status: "In Progress"
    },
    {
        title:"Buy computer",
        status: "Pending"
    },
    {
        title:"Clean the house",
        status: "Completed"
    },
];


console.log(chalk.red(tasks.map(p=>p.title)));
console.log(chalk.blue(tasks.map(p=>p.title)));



const task1 = new Task(1, 'Complete homework', 'In Progress');
const task2 = new Task(2, 'Buy computer', 'Pending');
const task3 = new Task(3, 'Clean the house', 'Completed');

console.log(task1.toString());
console.log(task2.toString());
console.log(task3.toString());
