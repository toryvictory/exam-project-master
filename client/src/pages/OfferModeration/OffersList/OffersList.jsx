import React from 'react';
import PropTypes from 'prop-types';
import OfferBox from '../../../components/OfferBox/OfferBox';
import styles from './OffersList.module.sass';

const OffersList = ({ offers }) => (
  <ul className={styles.list}>
    {offers.map((offer) => <li key={offer.id}><OfferBox data={offer} /></li>)}
  </ul>
);

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OffersList;
