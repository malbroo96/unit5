const express = require("express");
const router = express.Router();
const Consultation = require("../models/consultation.model");
const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");

router.post("/", async (req, res) => {
  try {
    const { doctorId, patientId, notes } = req.body;
    const doctor = await Doctor.findOne({ _id: doctorId, isActive: true });
    const patient = await Patient.findOne({ _id: patientId, isActive: true });
    if (!doctor || !patient) {
      return res.status(400).json({ error: "Either doctor or patient is inactive or does not exist" });
    }
    const consultation = await Consultation.create({ doctorId, patientId, notes });
    res.status(201).json(consultation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/recent", async (req, res) => {
  try {
    const consultations = await Consultation.find({ isActive: true })
      .sort({ consultedAt: -1 })
      .limit(5)
      .populate("doctorId", "name specialization")
      .populate("patientId", "name age gender");
    res.json(consultations);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id/consultations/count", async (req, res) => {
  try {
    const count = await Consultation.countDocuments({ doctorId: req.params.id, isActive: true });
    res.json({ doctorId: req.params.id, totalConsultations: count });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
