import TaskManager from "./task/task-manager.js";
import mongoose from 'mongoose';
import 'dotenv/config'

mongoose.Promise = global.Promise;

mongoDbConnect();

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