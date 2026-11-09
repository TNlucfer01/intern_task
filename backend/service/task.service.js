const task=require("../model/task.model");

const createTask=async(taskData)=>{
    try{
        const newTask=await task.create(taskData);
        return newTask;
    }
    catch(err){
        throw err;
    }
}

const getTaskById=async(taskId)=>{
    try{
        const taskData=await task.findByPk(taskId);
        return taskData;
    }
    catch(err){
        throw err;
    }
}

const getAllTasks=async()=>{
    try{
        const tasks=await task.findAll();
        return tasks;
    }
    catch(err){
        throw err;
    }
}

const updateTaskById=async(taskId,taskData)=>{
    try{
        const taskToUpdate=await task.findByPk(taskId);
        if(!taskToUpdate){
            throw new Error("Task not found");
        }
        await taskToUpdate.update(taskData);
        return taskToUpdate;
    }
    catch(err){
        throw err;
    }
}
const deleteTaskById=async(taskId)=>{
    try{
        const taskToDelete=await task.findByPk(taskId);
        if(!taskToDelete){
            throw new Error("Task not found");
        }
        await taskToDelete.destroy();
        return true;
    }
    catch(err){
        throw err;
    }
}

module.exports={
    createTask,
    getTaskById,
    getAllTasks,
    updateTaskById,
    deleteTaskById
}

