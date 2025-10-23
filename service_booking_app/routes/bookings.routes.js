const express = require("express");
const {
  createBooking,
  getBookings,
  updateBooking,
  cancelBooking,
  approveBooking,
  rejectBooking,
  deleteBooking
} = require("../controllers/booking.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authenticate);

router.post("/", authorize("user"), createBooking);
router.get("/", getBookings);
router.put("/:id", authorize("user"), updateBooking);
router.delete("/:id", authorize("user"), cancelBooking);

router.patch("/:id/approve", authorize("admin"), approveBooking);
router.patch("/:id/reject", authorize("admin"), rejectBooking);
router.delete("/:id/admin", authorize("admin"), deleteBooking);

module.exports = router;
