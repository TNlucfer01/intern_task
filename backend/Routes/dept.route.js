const router = require("express").Router();
const departmentController = require("../Controller/dept.controller");
const hasPermission = require("../middleware/authorization.middleware");

router.get("/", hasPermission("read_department"), departmentController.getAllDepartments);
router.get("/:id", hasPermission("read_department"), departmentController.getDepartmentById);
router.post("/", hasPermission("create_department"), departmentController.createDepartment);
router.put("/:id", hasPermission("update_department"), departmentController.updateDepartment);
router.delete("/:id", hasPermission("delete_department"), departmentController.deleteDepartment);

module.exports = router;
