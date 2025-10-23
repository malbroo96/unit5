require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const bookingRoutes = require("./routes/bookings.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect MongoDB
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
