const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
