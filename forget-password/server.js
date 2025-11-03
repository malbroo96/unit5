const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

app.use(express.json());
app.use("/api/auth", authRoutes); // 👈 This connects your routes

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
