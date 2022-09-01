const express = require("express");
const { registerUser, LoginUser, logout, forgotPassword, resetPassword } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(LoginUser);

router.route("/password/forget",forgotPassword)

router.route("/password/reset/:token").put(resetPassword)

router.route("/logout").get(logout)

module.exports = router;