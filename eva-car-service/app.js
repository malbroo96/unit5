require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");
const serviceRoutes = require("./src/routes/service.routes");
connectDB()
const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);

module.exports = app;
