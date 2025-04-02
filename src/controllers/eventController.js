const Event = require("../models/eventModel");

// Get all events with pagination
exports.getAllEvents = async (req, res) => {
  try {
    let { page, limit } = req.query;

    // Default values if query params are not provided
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default to 10 events per page

    const skip = (page - 1) * limit;

    // Fetch events with pagination
    const events = await Event.find().skip(skip).limit(limit);

    // Get total count of events (for frontend to know total pages)
    const totalEvents = await Event.countDocuments();

    res.status(200).json({
      page,
      totalPages: Math.ceil(totalEvents / limit),
      totalEvents,
      events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity } = req.body;

    if (!title || !description || !date || !location || !capacity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      capacity,
      createdBy: req.user.id, // Assuming `protect` middleware adds `req.user`
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update fields if provided
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.capacity = capacity || event.capacity;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
