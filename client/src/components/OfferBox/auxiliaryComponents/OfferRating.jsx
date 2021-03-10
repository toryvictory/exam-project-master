import React from 'react';
import Rating from 'react-rating';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  changeMark,
  clearChangeMarkError,
} from '../../../actions/actionCreator';
import CONSTANTS from '../../../constants';

const OfferRating = ({ data }) => {
  const dispatch = useDispatch();
  const rateOffer = (value) => {
    dispatch(clearChangeMarkError());
    dispatch(changeMark({
      mark: value,
      offerId: data.id,
      isFirst: !data.mark,
      creatorId: data.User.id,
    }));
  };
  return (
    (
      <Rating
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
            alt="star"
          />
        )}
        onClick={rateOffer}
        placeholderRating={data.mark}
      />
    )
  );
};

OfferRating.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mark: PropTypes.number.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default OfferRating;
