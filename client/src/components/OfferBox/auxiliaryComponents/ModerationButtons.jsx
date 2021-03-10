import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from '../OfferBox.module.sass';
import CONSTANTS from '../../../constants';
import { changeOfferModerationStatus } from '../../../actions/offers/offersActionCreators';

const ModerationButtons = ({ moderationStatus, offerId }) => {
  const dispatch = useDispatch();

  const approve = () => {
    dispatch(changeOfferModerationStatus({
      id: offerId,
      moderationStatus: CONSTANTS.MODERATION_STATUS_APPROVED,
    }));
  };
  const block = () => {
    dispatch(changeOfferModerationStatus({
      id: offerId,
      moderationStatus: CONSTANTS.MODERATION_STATUS_REJECTED,
    }));
  };
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
  offerId: PropTypes.number.isRequired,
};

export default ModerationButtons;
