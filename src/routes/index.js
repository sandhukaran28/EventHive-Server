const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const eventRoutes = require("./event");
const bookingRoutes = require("./booking");
const authRoutes = require("./auth");

router.use("/auth", authRoutes); 
// router.use("/user", userRoutes);
// router.use("/events", eventRoutes);
// router.use("/bookings", bookingRoutes);

module.exports = router;