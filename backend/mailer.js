// mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config()

// Create the transporter object using environment variables
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE_NAME,
  auth: {
    user: process.env.SERVICE_EMAIL,
    pass: process.env.SERVICE_APP_PASSWORD
  }
});

console.log(process.env.SERVICE_NAME);

// Export the transporter object
module.exports = transporter;
