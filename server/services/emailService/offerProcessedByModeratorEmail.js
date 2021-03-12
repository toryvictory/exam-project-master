const transporter = require('./index');
const config = require('../../configs/config');

const { email: { shEmail } } = config;

const createMailOptions = (email, isApproved, fullName, contestName) => ({
  from: shEmail,
  to: email,
  subject: `Your offer for the contest "${contestName}" ${isApproved ? 'approved' : 'blocked'} by moderator`,
  html: `<p>Dear ${fullName},</p>
<p>The offer you submitted for the contest "${contestName}" has been ${isApproved ? 'approved' : 'blocked'} by our moderation team${isApproved ? '' : ' due to violation of our community rules'}.</p>
${isApproved ? '<p>The contest holder now can view your offer</p>'
    : '<p>Your offer won\'t be visible to the contest holder and will not take part in the contest.</p>'}
<p>Please feel free to contact our support team should you have any questions.</p>`,
});

module.exports.sendOfferModerationEmail = async (email, isApproved, fullName, contestName) => {
  await transporter.sendMail(createMailOptions(email, isApproved, fullName, contestName));
};
