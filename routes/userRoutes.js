const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// register User
router.post("/register-user", userController.userRegister);
// user login
router.post("/login-user", userController.userLogin);
// change password
router.post("/change_password", userController.change_password);

module.exports = router;