// index.js
const express = require("express");
const eventEmitter = require("./eventLogger");
const delayMessage = require("./delay");

const app = express();
const PORT = 3000;

// test route
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// emit route
app.get("/emit", (req, res) => {
  const { message } = req.query;
  if (!message) {
    return res.status(400).json({ error: "Message query parameter is required" });
  }

  // emit log event
  eventEmitter.emit("log", message);

  res.json({
    status: "Event logged",
    timestamp: new Date().toISOString()
  });
});

// delay route
app.get("/delay", async (req, res) => {
  const { message, time } = req.query;
  if (!message || !time) {
    return res.status(400).json({ error: "Message and time query parameters are required" });
  }

  try {
    const msg = await delayMessage(message, parseInt(time));
    res.json({
      message: msg,
      delay: `${time}ms`
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
