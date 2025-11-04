const express = require("express");
const router = express.Router();
const {
  bookService,
  completeService,
  getServiceReport,
} = require("../controllers/service.controller");

const { authMiddleware } = require("../middlewares/auth.middleware");

// Book a new service (requires login)
router.post("/book", authMiddleware, bookService);

// Mark a service as completed
router.patch("/complete/:id", authMiddleware, completeService);

// Generate service analytics report (admin or authenticated)
router.get("/report", authMiddleware, getServiceReport);

module.exports = router;
