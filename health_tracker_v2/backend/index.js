import express from "express";
import axios from "axios";
import cors from "cors";
import connectDB from "./db.js";
import User from "./models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ Health API route
app.get("/api/health", async (req, res) => {
  try {
    const response = await axios.get(
      "https://odphp.health.gov/myhealthfinder/api/v4/itemlist.json?Type=topic"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching health data:", error.message);
    res.status(500).json({ error: "Failed to fetch health data" });
  }
});

// ✅ Signup route
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// ✅ Login route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ✅ Start server
await connectDB();
app.listen(5000, () => console.log("✅ Server running on port 5000"));
