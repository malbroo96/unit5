const express = require("express");
const app = express();
const authorRoutes = require("./routes/authorRoutes");

app.use(express.json()); 
app.use("/api/authors", authorRoutes);

app.get("/", (req, res) => {
  res.send("Library API is running...");
});

module.exports = app;
