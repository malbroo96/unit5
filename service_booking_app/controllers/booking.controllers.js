const asyncHandler = require("express-async-handler");
const Booking = require("../models/booking.model");

// Create booking (user)
exports.createBooking = asyncHandler(async (req, res) => {
  const { serviceName, requestedAt } = req.body;
  const booking = await Booking.create({
    serviceName,
    requestedAt,
    user: req.user._id,
  });
  res.status(201).json(booking);
});

// Get bookings (user/admin)
exports.getBookings = asyncHandler(async (req, res) => {
  const bookings = req.user.role === "admin"
    ? await Booking.find().populate("user", "username email")
    : await Booking.find({ user: req.user._id });
  res.json(bookings);
});

// Update booking (if pending)
exports.updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new Error("Booking not found");
  if (booking.user.toString() !== req.user._id.toString()) throw new Error("Unauthorized");
  if (booking.status !== "pending") throw new Error("Cannot update after approval/rejection");

  booking.serviceName = req.body.serviceName || booking.serviceName;
  booking.requestedAt = req.body.requestedAt || booking.requestedAt;
  await booking.save();
  res.json(booking);
});

// Cancel booking (user)
exports.cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new Error("Booking not found");
  if (booking.user.toString() !== req.user._id.toString()) throw new Error("Unauthorized");
  if (booking.status !== "pending") throw new Error("Cannot cancel after approval/rejection");

  booking.status = "cancelled";
  await booking.save();
  res.json({ message: "Booking cancelled" });
});

// Admin actions
exports.approveBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new Error("Booking not found");
  booking.status = "approved";
  await booking.save();
  res.json({ message: "Booking approved" });
});

exports.rejectBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new Error("Booking not found");
  booking.status = "rejected";
  await booking.save();
  res.json({ message: "Booking rejected" });
});

exports.deleteBooking = asyncHandler(async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking deleted" });
});
