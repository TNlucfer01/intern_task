const router = require("express").Router();
const { requireAuth } = require("../middleware/authentication.middleware");


router.use("/auth", require("./auth.route"));
router.use(requireAuth);
router.use("/users", require("./user.route"));
router.use("/tasks", require("./task.route"));
router.use("/projects", require("./project.route"));
router.use("/departments", require("./dept.route"));

module.exports = router;