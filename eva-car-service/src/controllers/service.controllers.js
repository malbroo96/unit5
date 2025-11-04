const Service = require("../models/service.model");
const sendEmail = require("../utils/sendEmail");

// BOOK SERVICE
exports.bookService = async (req, res) => {
  try {
    const { vehicleModel, serviceType, bookingDate } = req.body;
    const costMap = { basic: 1000, premium: 2000, full: 3000 };
    const cost = costMap[serviceType] || 0;

    const service = await Service.create({
      userId: req.user._id,
      vehicleModel,
      serviceType,
      bookingDate,
      cost,
    });

    const htmlContent = `
      <h3>AutoCare Service Center</h3>
      <p>Your vehicle service has been successfully booked!</p>
      <p><strong>Booking ID:</strong> ${service._id}</p>
      <p><strong>Vehicle Model:</strong> ${vehicleModel}</p>
      <p><strong>Service Type:</strong> ${serviceType}</p>
      <p><strong>Booking Date:</strong> ${new Date(bookingDate).toDateString()}</p>
      <p><strong>Total Cost:</strong> ₹${cost}</p>
    `;

    await sendEmail(req.user.email, "Service Booking Confirmation", htmlContent);

    res.status(201).json({
      message: "Service booked successfully",
      serviceId: service._id,
    });
  } catch (error) {
    console.error("Error booking service:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// COMPLETE SERVICE
exports.completeService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id).populate("userId");
    if (!service) return res.status(404).json({ message: "Service not found" });

    service.status = "completed";
    await service.save();

    const htmlContent = `
      <h3>AutoCare Service Center</h3>
      <p>Your vehicle service is now complete!</p>
      <p><strong>Booking ID:</strong> ${service._id}</p>
      <p><strong>Status:</strong> Completed</p>
    `;

    await sendEmail(service.userId.email, "Service Completed", htmlContent);

    res.status(200).json({ message: "Service marked as completed" });
  } catch (error) {
    console.error("Error completing service:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// REPORT
exports.getReport = async (req, res) => {
  try {
    const report = await Service.aggregate([
      {
        $group: {
          _id: "$serviceType",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$cost" },
        },
      },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: "$count" },
          totalRevenue: { $sum: "$totalRevenue" },
          serviceBreakdown: {
            $push: {
              serviceType: "$_id",
              count: "$count",
              totalRevenue: "$totalRevenue",
            },
          },
        },
      },
    ]);

    res.status(200).json(report[0] || { message: "No data available" });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Server error" });
  }
};
