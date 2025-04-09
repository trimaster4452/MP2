// emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();
console.log('Using email:', process.env.EMAIL_USER);
console.log('Using pass:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
async function sendLoginNotification(email, username) {
  const mailOptions = {
    from: `"MP2" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Login Successful',
    html: `<p>Hello <strong>${username}</strong>,</p>
           <p>You have successfully logged into your account.</p>
           <p>If this wasn't you, please secure your account.</p>
           <br><p>– Passwordless Auth System</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Login email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendLoginNotification };
