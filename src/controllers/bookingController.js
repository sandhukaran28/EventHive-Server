const Booking = require("../models/bookingModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

// Create a new booking
exports.createBooking = async (req, res) => {
  const { eventId, quantity } = req.body;
  const userId = req.user.id;

  try {
    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if there is enough capacity
    if (event.capacity < quantity) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    // Create the booking
    const newBooking = new Booking({
      user: userId,
      event: eventId,
      quantity,
    });

    await newBooking.save();

    // Update event capacity
    event.capacity -= quantity;

    // ✅ Push user into attendees array as many times as quantity
    for (let i = 0; i < quantity; i++) {
      event.attendees.push(userId);
    }

    await event.save();

    res.status(201).json({
      message: "Booking confirmed",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("event", "title date location");
    
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id)
      .populate("user", "name email")
      .populate("event", "title date location");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (!["confirmed", "canceled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Update the booking status
    booking.status = status;

    // If canceled, update the event capacity
    if (status === "canceled") {
      const event = await Event.findById(booking.event);
      event.capacity += booking.quantity;
      await event.save();
    }

    await booking.save();

    res.status(200).json({
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Set booking status to canceled
    booking.status = "canceled";

    // Update event capacity
    const event = await Event.findById(booking.event);
    event.capacity += booking.quantity;
    await event.save();

    await booking.save();

    res.status(200).json({
      message: "Booking canceled",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
