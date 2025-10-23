const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  serviceName: { type: String, required: true },
  requestedAt: { type: Date, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected", "cancelled"], default: "pending" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = model("Booking", bookingSchema);
