import express from "express";
import axios from "axios";
import cors from "cors";
import connectDB from "./db.js";

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
app.post("/api/submit", express.json(), (req, res) => {
  const userData = req.body;
  console.log("Received user data:", userData);
  res.status(200).json({ message: "User data received successfully" });
});
 await connectDB();
app.listen(5000, () => console.log("✅ Proxy running on port 5000"));
