import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ROLES } from '../../constants';
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
import ModerationButtons from './auxiliaryComponents/ModerationButtons';
import ModerationStatus from './auxiliaryComponents/ModerationStatus';

const OfferBox = (props) => {
  const { id, role } = useSelector(userSelector);
  const { data, setOfferStatus, needButtons } = props;
  const {
    User, status, moderationStatus, id: offerId,
  } = data;
  return (
    <div className={styles.offerContainer}>
      { (role === ROLES.MODERATOR || role === ROLES.CREATOR)
      && <ModerationStatus moderationStatus={moderationStatus} />}
      { (role === ROLES.CUSTOMER || role === ROLES.CREATOR)
      && <OfferStatus status={status} /> }
      <div className={styles.mainInfoContainer}>
        { (role === ROLES.CUSTOMER || role === ROLES.CREATOR)
       && <CreativeInfo user={User} /> }
        <div className={styles.responseContainer}>
          <OfferContent offer={data} />
          {role === ROLES.CUSTOMER && <OfferRating data={data} />}
        </div>
        {role === ROLES.CUSTOMER && <OfferChat userId={id} interlocutor={User} />}
        {role === ROLES.MODERATOR
        && (
        <ModerationButtons
          moderationStatus={moderationStatus}
          offerId={offerId}
        />
        )}
      </div>
      {(role === ROLES.CUSTOMER && needButtons(status))
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
      moderationStatus: PropTypes.string.isRequired,
      User: PropTypes.shape(
        {
          id: PropTypes.number.isRequired,
        },
      ),
    },
  ).isRequired,
  setOfferStatus: PropTypes.func,
  needButtons: PropTypes.func,
};

OfferBox.defaultProps = {
  setOfferStatus: null,
  needButtons: null,
};

export default OfferBox;
