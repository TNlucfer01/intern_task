const taskController = require("../Controller/task.controller");
const router = require("express").Router();
const hasPermission = require("../middleware/authorization.middleware");

router.get("/:id", hasPermission("read_task"), taskController.getTaskById);
router.get("/", hasPermission("read_task"), taskController.getAllTasks);
router.post("/", hasPermission("create_task"), taskController.createTask);
router.put("/:id", hasPermission("update_task"), taskController.updateTask);
router.delete("/:id", hasPermission("delete_task"), taskController.deleteTask);

module.exports = router;
