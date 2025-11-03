const { createTransporter } = require('../config/mailer');
const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, html }) {
  const transporter = await createTransporter();
  const info = await transporter.sendMail({
    from:"akhiljoseph225292@gmail.com",
    to,
    subject,
    html
  });

  const preview = transporter.testAccount
    ? nodemailer.getTestMessageUrl(info)
    : null;

  return { info, preview };
}

module.exports = sendEmail;
