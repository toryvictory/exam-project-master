import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../OfferBox.module.sass';
import CONSTANTS from '../../../constants';
import { changeShowImage } from '../../../actions/actionCreator';

const OfferContent = ({ offer }) => {
  const dispatch = useDispatch();
  return (
    <>
      {offer.fileName ? (
        <img
          onClick={() => dispatch(changeShowImage({
            imagePath: offer.fileName,
            isShowOnFull: true,
          }))}
          className={styles.responseLogo}
          src={`${CONSTANTS.publicURL}${offer.fileName}`}
          alt="logo"
        />
      ) : (
        <span className={styles.response}>{offer.text}</span>
      )}
    </>
  );
};

OfferContent.propTypes = {
  offer: PropTypes.shape({
    fileName: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default OfferContent;
