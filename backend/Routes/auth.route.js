const router = require("express").Router();
const authController = require("../Controller/auth.controller");
const { requireAuth } = require("../middleware/authentication.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me",requireAuth, authController.getMe);
module.exports = router;
