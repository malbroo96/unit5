const express = require("express");
const router = express.Router();
const Patient = require("../models/patient.model");
const Consultation = require("../models/consultation.model");


router.post("/", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/:id/doctors", async (req, res) => {
  try {
    const consultations = await Consultation.find({ patientId: req.params.id, isActive: true })
      .populate({ path: "doctorId", select: "name specialization" })
      .sort({ consultedAt: -1 });
    const doctors = consultations.map(c => c.doctorId);
    res.json(doctors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const { gender } = req.query;
    const filter = { isActive: true };
    if (gender) filter.gender = gender;
    const patients = await Patient.find(filter);
    res.json(patients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Patient.findByIdAndUpdate(req.params.id, { isActive: false });
    await Consultation.updateMany({ patientId: req.params.id }, { isActive: false });
    res.json({ message: "Patient and related consultations marked inactive" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
