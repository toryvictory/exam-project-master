import React from 'react';
import FooterQuickLinks from './FooterQuickLinks/FooterQuickLinks';
import FeaturedCategories from './FeaturedCategories/FeaturedCategories';
import CopyrightAndContactsPanel from './CopyrightAndContactsPanel/CopyrightAndContactsPanel';
import styles from './Footer.module.sass';

const Footer = () => (
  <section className={styles.footerContainer}>
    <FooterQuickLinks />
    <FeaturedCategories />
    <CopyrightAndContactsPanel />
  </section>
);

export default Footer;
