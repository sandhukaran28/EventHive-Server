const express = require("express");
const { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware"); // Ensure authentication
const { validateEvent } = require("../middleware/eventValidationMiddleware");

const router = express.Router();

router.get("/",protect, getAllEvents);
router.get("/:id",protect, getEventById);
router.post("/", protect,validateEvent, createEvent);
router.put("/:id", protect,validateEvent, updateEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
