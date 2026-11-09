const projectController = require("../Controller/project.controller");
const router = require("express").Router();
const hasPermission = require("../middleware/authorization.middleware");

router.get("/:id", hasPermission("read_project"), projectController.getProjectById);
router.get("/", hasPermission("read_project"), projectController.getAllProject);
router.post("/", hasPermission("create_project"), projectController.createProject);
router.put("/:id", hasPermission("update_project"), projectController.updateProject);
router.delete("/:id", hasPermission("delete_project"), projectController.deleteProject);
module.exports = router;
