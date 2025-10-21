const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor.model");
const Consultation = require("../models/consultation.model");

router.post("/", async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id/patients", async (req, res) => {
  try {
    const consultations = await Consultation.find({ doctorId: req.params.id, isActive: true })
      .populate({ path: "patientId", select: "name age gender" })
      .sort({ consultedAt: -1 });
    const patients = consultations.map(c => c.patientId);
    res.json(patients);
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

router.delete("/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndUpdate(req.params.id, { isActive: false });
    await Consultation.updateMany({ doctorId: req.params.id }, { isActive: false });
    res.json({ message: "Doctor and related consultations marked inactive" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
