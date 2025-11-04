const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

async function sendEmail(to, subject, htmlContent) {
  try {
    const info = await transporter.sendMail({
      from: `"AutoCare Service Center" <${process.env.EMAIL_USER}>`,
      to,
      bcc: process.env.SUPERADMIN_EMAIL, // sends copy to Kashish
      subject,
      html: htmlContent,
    });
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
}

module.exports = sendEmail;
