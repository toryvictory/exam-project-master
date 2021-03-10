import Rating from 'react-rating';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../OfferBox.module.sass';
import CONSTANTS from '../../../constants';

const CreativeInfo = ({ user }) => {
  const {
    avatar, firstName, lastName, email, rating,
  } = user;
  return (
    <div className={styles.userInfo}>
      <div className={styles.creativeInfoContainer}>
        <img
          src={
        avatar ? `${CONSTANTS.publicURL}${avatar}` : CONSTANTS.ANONYM_IMAGE_PATH
      }
          alt="user"
        />
        <div className={styles.nameAndEmail}>
          <span>{`${firstName} ${lastName}`}</span>
          <span>{email}</span>
        </div>
      </div>
      <div className={styles.creativeRating}>
        <span className={styles.userScoreLabel}>Creative Rating </span>
        <Rating
          initialRating={rating}
          fractions={2}
          fullSymbol={(
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
              alt="star"
            />
      )}
          placeholderSymbol={(
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
              alt="star"
            />
      )}
          emptySymbol={(
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
              alt="star-outline"
            />
      )}
          readonly
        />
      </div>
    </div>
  );
};

CreativeInfo.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default CreativeInfo;
