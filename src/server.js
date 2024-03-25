import express from 'express';
import TaskManager from './task/task-manager.js';
import mongoose from 'mongoose';
import Task from './task/task.js';
import { validateTaskData } from './middleware/validateTaskData.js';
import 'dotenv/config';


mongoDbConnect();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/tasks', async(req, res) => {
    try{
        const taskManager = new TaskManager();

        const tasks = await taskManager.getTasks();

        res.json(tasks);
    } catch(err){
        res.status(500).send(err.message)
        console.log(err.message)
    }
});


app.post('/tasks', validateTaskData, async (req, res) => {
    try{
        console.log(req);
        const taskManager = new TaskManager();
        const newTask = new Task(
            uuid(), 
            req.body.description, 
            req.body.status,
            req.body.title
        );

        const result = await taskManager.addTask(newTask);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err.message);
        console.log(err.message)
    }
});

app.delete('/tasks/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const taskManager = new TaskManager();

        await taskManager.deleteTask(taskId);

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).send(err.message);
    }
});




function mongoDbConnect(){
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
        authSource: 'admin',
    };

    mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`, mongoOptions)
        .then(() => {
            console.log("MongoDB connected");

            var testManager = new TaskManager();

            testManager.loadTasks();
        })
        .catch(err => console.error('MongoDB connection error:', err));
}


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
