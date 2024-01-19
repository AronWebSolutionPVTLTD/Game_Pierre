const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/forgotpassword", userController.forgotpassword);
router.post("/resetpassword", userController.resetpassword);

module.exports = router;
