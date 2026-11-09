const router = require("express").Router();
const userController = require("../Controller/user.controller");
const hasPermission = require("../middleware/authorization.middleware");
router.get("/:id", hasPermission("read_user"),userController.getUserById);
router.get("/", hasPermission("read_user"), userController.getallUsers);
router.post("/", hasPermission("create_user"), userController.createUser);
router.put("/:id", hasPermission("update_user"), userController.updateUser);
router.delete("/:id", hasPermission("delete_user"), userController.deleteUser);
module.exports = router;
