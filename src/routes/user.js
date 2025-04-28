const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserBookings,
} = require("../controllers/userController");

// Get user bookings
router.get("/bookings", protect, getUserBookings);

// Get all users (Admin only)
router.get("/", protect, isAdmin, getAllUsers);

// Get user by ID
router.get("/:id", protect, getUserById);

// Update user details
router.put("/", protect, updateUser);

// Delete user
router.delete("/:id", protect, deleteUser);


module.exports = router;
