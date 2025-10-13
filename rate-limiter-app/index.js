const express = require("express");
const rateLimit = require("express-rate-limit");
const apiRouter = require("./routes/api");

const app = express();
app.use(express.json());

// Rate limiter setup
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: { error: "Too many requests, please try again later." }
});

// Use the router
app.use("/api", apiRouter(limiter));

// Undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
