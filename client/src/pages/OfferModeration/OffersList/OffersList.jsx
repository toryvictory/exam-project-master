import React from 'react';
import PropTypes from 'prop-types';
import OfferBox from '../../../components/OfferBox/OfferBox';
import styles from './OffersList.module.sass';

const OffersList = ({ offers }) => {
  if (offers.length === 0) {
    return <div className={styles.noData}>Nothing to show</div>;
  }
  return (
    <ul className={styles.list}>
      {offers.map((offer) => <li key={offer.id}><OfferBox data={offer} /></li>)}
    </ul>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OffersList;
