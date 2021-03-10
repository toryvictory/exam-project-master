import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../constants';
import styles from '../OfferBox.module.sass';

const OfferStatus = ({ status }) => {
  if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
    return (
      <i
        className={classNames('fas fa-times-circle reject', styles.reject)}
      />
    );
  } if (status === CONSTANTS.OFFER_STATUS_WON) {
    return (
      <i
        className={classNames('fas fa-check-circle resolve', styles.resolve)}
      />
    );
  }
  return null;
};

OfferStatus.propTypes = {
  status: PropTypes.string,
};

OfferStatus.defaultProps = {
  status: null,
};

export default OfferStatus;
