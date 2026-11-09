const taskService = require("../service/task.service");

async function getTaskById(req, res) {
    try {
        const taskId = req.params.id;
        const taskData = await taskService.getTaskById(taskId);
        if (!taskData) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(taskData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAllTasks(req, res) {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
 async function createTask(req, res) {                                                                       
      try {                                                                                                     
        const taskData = {                                                                                      
          ...req.body,                                                                                          
          createdBy: req.user.id,                    // Cannot be spoofed                                       
          assignedby: req.body.assignedby || req.user.id,
        };                                                                                                      
        const newTask = await taskService.createTask(taskData);                                                 
        res.status(201).json(newTask);                                                                          
      } catch (err) {                                                                                           
        res.status(err.statusCode || 500).json({ error: err.message });                                         
      }                                                                                                         
    }                                                                                                           
      
async function updateTask(req, res) {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const updatedTask = await taskService.updateTaskById(taskId, taskData);
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
}

async function deleteTask(req, res) {
    try {
        const taskId = req.params.id;
        const deleted = await taskService.deleteTaskById(taskId);
        if (deleted) {
            res.status(200).json({ message: "Task deleted successfully" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    getTaskById,
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};
