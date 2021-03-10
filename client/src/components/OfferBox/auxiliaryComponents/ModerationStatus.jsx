import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CONSTANTS from '../../../constants';
import styles from '../OfferBox.module.sass';

const ModerationStatus = ({ moderationStatus }) => {
  let string;
  switch (moderationStatus) {
    case CONSTANTS.MODERATION_STATUS_PENDING:
      string = 'PENDING MODERATION';
      break;
    case CONSTANTS.MODERATION_STATUS_APPROVED:
      string = 'APPROVED BY MODERATOR';
      break;
    case CONSTANTS.MODERATION_STATUS_REJECTED:
      string = 'BLOCKED BY MODERATOR';
      break;
    default:
  }
  const classes = classNames(styles.moderationStatus, {
    [styles.pendingModeration]: moderationStatus === CONSTANTS.MODERATION_STATUS_PENDING,
    [styles.approvedByModerator]: moderationStatus === CONSTANTS.MODERATION_STATUS_APPROVED,
    [styles.rejectedByModerator]: moderationStatus === CONSTANTS.MODERATION_STATUS_REJECTED,
  });
  return (
    <div className={classes}>
      {string}
    </div>
  );
};

ModerationStatus.propTypes = {
  moderationStatus: PropTypes.string.isRequired,
};

export default ModerationStatus;
