// mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config()

// Create the transporter object using environment variables
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'crystel.torp@ethereal.email',
      pass: 'FQmUhnBuD9TTtU99My'
  }
});

//console.log(process.env.SERVICE_NAME);

// Export the transporter object
module.exports = transporter;
