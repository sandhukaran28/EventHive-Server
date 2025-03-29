const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
        quantity: { type: Number, required: true, min: 1 },
        status: { type: String, enum: ["confirmed", "canceled"], default: "confirmed" },
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
