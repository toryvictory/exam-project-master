import React from 'react';
import PropTypes from 'prop-types';
import OfferBox from '../../../components/OfferBox/OfferBox';

const OffersList = ({ offers }) => (
  <ul>
    {offers.map((offer) => <OfferBox key={offer.id} data={offer} />)}
  </ul>
);

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OffersList;
