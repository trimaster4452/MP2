const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendTestEmail() {
  try {
    await transporter.sendMail({
      from: `"Test Mailer" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'Test Email',
      text: 'If you received this, your setup is correct!',
    });
    console.log('✅ Email sent successfully!');
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
}

sendTestEmail();
