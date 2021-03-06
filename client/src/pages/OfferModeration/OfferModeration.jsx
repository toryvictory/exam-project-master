import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './OfferModeration.module.sass';

const OfferModeration = () => (
  <div className={styles.pageContainer}>
    <Header />
    <main>
      <div>Moderation</div>
    </main>
    <Footer />
  </div>
);

export default OfferModeration;
