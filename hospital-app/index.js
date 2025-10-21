require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Import routes
const doctorRoutes = require("./routes/doctor.routes");
const patientRoutes = require("./routes/patient.routes");
const consultationRoutes = require("./routes/consultation.routes");

// Use routes
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/consultations", consultationRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
