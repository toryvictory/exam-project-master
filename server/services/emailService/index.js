const nodemailer = require('nodemailer');
const config = require('../../configs/config');

const { email: { userEmail, passwordEmail } } = config;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: userEmail,
    pass: passwordEmail,
  },
});

module.exports = transporter;
