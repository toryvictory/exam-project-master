import React from 'react';
import styles from './FooterQuickLinks.module.sass';
import CONSTANTS from '../../../constants';
import FooterItem from './FooterItem/FooterItem';

const FooterQuickLinks = () => (
  <section className={styles.sectionContainer}>
    <ul className={styles.textContainer}>
      {
                    CONSTANTS.FooterItems.map((item, index) => (
                      <li key={index}>
                        <FooterItem item={item} />
                      </li>
                    ))
                }
    </ul>
  </section>
);

export default FooterQuickLinks;
