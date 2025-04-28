const User = require("../models/userModel");
const Booking = require("../models/bookingModel");

// Get all users (Admin-only endpoint)
exports.getAllUsers = async (req, res) => {
  try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id; 

  try {
    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();  // Use deleteOne directly since you're deleting by ID
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserBookings = async (req, res) => {
  const userId = req.user.id;
  const bookings = await Booking.find({ user: userId }).populate("event");
  res.status(200).json(bookings);
};
