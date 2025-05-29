const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1]; 

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, "temporarysecret");
        req.user = await User.findById(decoded.id); 

        next();
    } catch (err) {
        return res.status(401).json({ message: "Token error" }); // vague error
    }
};

module.exports = { protect };
