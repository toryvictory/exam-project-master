const transporter = require('./index');
const config = require('../../configs/config');

const { email: { userEmail }, url } = config;

const createMailOptions = (email, token) => ({
  from: userEmail,
  to: email,
  subject: 'Please confirm password reset',
  html: `<p>Squadhelp has received password reset request for the account associated with this email address.</p>
<p>To confirm password change please click the following link <a href="${url}/confirmPasswordReset/${token}">${url}/confirmPasswordReset/${token}</a>.</p>
<p>If you didn't request password change, please, simply ignore this email.</p>
<p>Thank you for using Squadhelp!</p>`,
});

module.exports.sendPassResetEmail = async (email, token) => {
  await transporter.sendMail(createMailOptions(email, token));
};
