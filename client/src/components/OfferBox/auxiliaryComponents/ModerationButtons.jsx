import React from 'react';
import PropTypes from 'prop-types';
import styles from '../OfferBox.module.sass';
import CONSTANTS from '../../../constants';

const ModerationButtons = ({ moderationStatus }) => {
  const approve = () => {};
  const block = () => {};
  return (
    <div className={styles.btnsContainer}>
      {(moderationStatus === CONSTANTS.MODERATION_STATUS_PENDING
        || moderationStatus === CONSTANTS.MODERATION_STATUS_REJECTED)
       && (
       <div role="button" onClick={approve} onKeyPress={approve} className={styles.resolveBtn} tabIndex={0}>
         Approve
       </div>
       )}
      {(moderationStatus === CONSTANTS.MODERATION_STATUS_PENDING
        || moderationStatus === CONSTANTS.MODERATION_STATUS_APPROVED)
      && (
      <div role="button" onClick={block} onKeyPress={block} className={styles.rejectBtn} tabIndex={0}>
        Block
      </div>
      ) }
    </div>
  );
};

ModerationButtons.propTypes = {
  moderationStatus: PropTypes.string.isRequired,
};

export default ModerationButtons;
