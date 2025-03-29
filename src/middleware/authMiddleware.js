const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

// Middleware to verify token and authenticate user
const protect = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied, not an admin" });
    }
    next();
};

module.exports = { protect, isAdmin };
