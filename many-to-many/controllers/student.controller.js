const Student = require("../models/student.model");
const Enrollment = require("../models/enrollment.model");

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndUpdate(id, { isActive: false });
    await Enrollment.updateMany({ studentId: id }, { isActive: false });
    res.json({ message: "Student and related enrollments deactivated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await Enrollment.find({ studentId: id, isActive: true })
      .populate("courseId", "title description");
    res.json(courses.map(e => e.courseId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
