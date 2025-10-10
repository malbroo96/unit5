// index.js
const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use("/todos", todoRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Todo App is running!");
});

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
