const express = require("express");
const router = express.Router();
const eventRoutes = require("./event");
const bookingRoutes = require("./booking");
const authRoutes = require("./auth");
const userRoutes = require("./user");

router.use("/auth", authRoutes); 
router.use("/users", userRoutes); 
// router.use("/events", eventRoutes);
// router.use("/bookings", bookingRoutes);

module.exports = router;