import express from "express";
import axios from "axios";
import cors from "cors";
import connectDB from "./db.js";
import User from "./models/User.js";

const app = express();
app.use(cors());

app.get("/api/health", async (req, res) => {
  try {
    const response = await axios.get(
      "https://odphp.health.gov/myhealthfinder/api/v4/itemlist.json?Type=topic"
    );
    res.json(response.data); // Axios already parses JSON
  } catch (error) {
    console.error("Error fetching health data:", error.message);
    res.status(500).json({ error: "Failed to fetch health data" });
  }
});

app.post("/api/submit", express.json(), async(req, res) => {
  const userData = req.body;
  console.log("Received user data:", userData);
  const user = await User.create({
    username: userData.username,
    email: userData.email,
    password: userData.password,
  });
  

  res.status(200).json({user });
});

await connectDB();
app.listen(5000, () => console.log("✅ Proxy running on port 5000"));
