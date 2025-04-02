const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../middleware/validationMiddleware");

// Register Route
router.post("/register",validateRegister, registerUser);

// Login Route
router.post("/login",validateLogin, loginUser);

module.exports = router;
