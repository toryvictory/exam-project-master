const nodemailer = require('nodemailer');
const config = require('../../configs/config');

const { email: { shEmail, shEmailPassword } } = config;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: shEmail,
    pass: shEmailPassword,
  },
});

module.exports = transporter;
