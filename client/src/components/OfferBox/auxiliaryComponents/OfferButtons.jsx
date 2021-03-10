import React from 'react';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import styles from '../OfferBox.module.sass';

const OfferButtons = ({ setOfferStatus, creatorId, offerId }) => {
  const resolveOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => setOfferStatus(creatorId, offerId, 'resolve'),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => setOfferStatus(creatorId, offerId, 'reject'),
        },
        {
          label: 'No',
        },
      ],
    });
  };
  return (
    <div className={styles.btnsContainer}>
      <div role="button" onClick={resolveOffer} onKeyPress={resolveOffer} className={styles.resolveBtn} tabIndex={0}>
        Resolve
      </div>
      <div role="button" onClick={rejectOffer} onKeyPress={rejectOffer} className={styles.rejectBtn} tabIndex={0}>
        Reject
      </div>
    </div>
  );
};

OfferButtons.propTypes = {
  setOfferStatus: PropTypes.func.isRequired,
  creatorId: PropTypes.number.isRequired,
  offerId: PropTypes.number.isRequired,
};

export default OfferButtons;
