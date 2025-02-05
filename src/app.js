require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db"); // Database connection
const noteRoutes = require("./routes/noteRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/notes", noteRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
