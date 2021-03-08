import React from 'react';
import PropTypes from 'prop-types';

const OffersList = ({ offers }) => (
  <div>
    {JSON.stringify(offers)}
  </div>
);

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OffersList;
