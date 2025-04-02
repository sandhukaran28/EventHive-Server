require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/index");
const mongoose = require("mongoose");
const helmet = require("helmet");

// Put your code here

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Put your code here

const mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/eventHive";
mongoose
    .connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("✅ MongoDB Connected");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    });

// API Routes
app.use("/api", routes);

module.exports = app;