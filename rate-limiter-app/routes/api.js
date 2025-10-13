// routes/api.js
const express = require("express");

function apiRouter(limiter) {
  const router = express.Router();

  console.log("✅ API Router loaded");

  // Public route (no rate limiting)
  router.get("/public", (req, res) => {
    res.json({ message: "This is a public endpoint!" });
  });

  // Limited route (with rate limiter)
  router.get("/limited", limiter, (req, res) => {
    res.json({ message: "You have access to this limited endpoint!" });
  });

  return router;
}

module.exports = apiRouter;
