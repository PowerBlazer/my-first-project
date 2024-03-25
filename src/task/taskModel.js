import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id: String,
    description: String,
    status: String,
    title: String
    });

export const TaskModel = mongoose.model('tasks', taskSchema);