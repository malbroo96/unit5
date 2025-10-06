const express = require("express");
const getFileInfo = require("./fileinfo");
const parseUrl = require("./urlparser");

const app = express();
const PORT = 3000;

// Test route
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// File info route
app.get("/fileinfo", (req, res) => {
  const filePath = req.query.filepath; // use lowercase 'filepath' to match query
  if (!filePath) {
    return res
      .status(400)
      .json({ error: "Please provide a 'filepath' query parameter" });
  }

  const info = getFileInfo(filePath);
  res.json(info);
});

// URL parser route
app.get("/parseurl", (req, res) => {
  const fullUrl = req.query.url;
  if (!fullUrl) {
    return res
      .status(400)
      .json({ error: "Please provide a 'url' query parameter" });
  }

  const parsed = parseUrl(fullUrl);
  res.json(parsed);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
