import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CONSTANTS from '../../constants';
import styles from './OfferBox.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';
import OfferStatus from './auxiliaryComponents/OfferStatus';
import CreativeInfo from './auxiliaryComponents/CreativeInfo';
import OfferContent from './auxiliaryComponents/OfferContent';
import OfferRating from './auxiliaryComponents/OfferRating';
import OfferChat from './auxiliaryComponents/OfferChat';
import OfferButtons from './auxiliaryComponents/OfferButtons';
import { userSelector } from '../../selectors';

const OfferBox = (props) => {
  const { id, role } = useSelector(userSelector);
  const { data, setOfferStatus, needButtons } = props;
  const { User, status } = data;
  return (
    <div className={styles.offerContainer}>
      <OfferStatus status={status} />
      <div className={styles.mainInfoContainer}>
        <CreativeInfo user={User} />
        <div className={styles.responseContainer}>
          <OfferContent offer={data} />
          {role === CONSTANTS.CUSTOMER && <OfferRating data={data} />}
        </div>
        {role === CONSTANTS.CUSTOMER && <OfferChat userId={id} interlocutor={User} />}
      </div>
      {needButtons(status)
      && (
      <OfferButtons
        setOfferStatus={setOfferStatus}
        creatorId={User.id}
        offerId={data.id}
      />
      )}
    </div>
  );
};

OfferBox.propTypes = {
  data: PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      User: PropTypes.shape(
        {
          id: PropTypes.number.isRequired,
        },
      ).isRequired,
    },
  ).isRequired,
  setOfferStatus: PropTypes.func.isRequired,
  needButtons: PropTypes.func.isRequired,
};

export default OfferBox;
