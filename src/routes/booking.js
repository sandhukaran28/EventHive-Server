const Booking = require("../models/bookingModel");

// @desc Book a ticket for an event
// @route POST /api/bookings
// @access Private (User)
const bookTicket = async (req, res) => {
    const { eventId, quantity } = req.body;

    try {
        const booking = new Booking({
            user: req.user.id,
            event: eventId,
            quantity,
        });

        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get user bookings
// @route GET /api/bookings
// @access Private (User)
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate("event");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Cancel a booking
// @route DELETE /api/bookings/:id
// @access Private (User)
const cancelBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: "Booking canceled successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { bookTicket, getUserBookings, cancelBooking };
