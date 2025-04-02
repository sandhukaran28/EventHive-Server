const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: Date, required: true },
        location: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who created the event
        capacity: { type: Number, required: true }, // Maximum number of attendees
        attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users attending the event
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
