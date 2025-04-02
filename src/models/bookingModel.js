const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
      quantity: { 
        type: Number, 
        required: true, 
        min: 1,
        validate: {
          validator: async function(value) {
            // Check if the event has enough available capacity
            const event = await mongoose.model('Event').findById(this.event);
            return event.capacity >= value; // Make sure there is enough space
          },
          message: 'Not enough seats available'
        }
      },
      status: { type: String, enum: ["confirmed", "canceled"], default: "confirmed" },
    },
    { timestamps: true }
  );
  
const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;