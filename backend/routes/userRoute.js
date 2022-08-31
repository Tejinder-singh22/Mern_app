const express = require("express");
const { registerUser, LoginUser, logout } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(LoginUser);
router.route("/logout").get(logout)

module.exports = router;