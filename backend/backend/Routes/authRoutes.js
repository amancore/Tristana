const express = require("express");
const { registerUser, loginUser,sendResetEmail, newPassword,logoutUser, getUserProfile } = require("../Controllers/authController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/forget-password", sendResetEmail);
router.post("/new-password/:resetToken", newPassword);

module.exports = router;
