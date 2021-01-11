import React from 'react';
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter } from '@mdi/js';
import styles from './CopyrightAndContactsPanel.module.sass';

const CopyrightAndContactsPanel = () => (
  <div className={styles.panelContainer}>
    <div className={styles.flexContainer}>
      <div className={styles.logoCopyrightContainer}>
        <img src="/staticImages/footer-logo.png" alt="logo" />
        <div className={styles.copyright}>Copyright © 2017 Squadhelp Inc</div>
      </div>
      <ul className={styles.iconsContainer}>
        <li>
          <a tabIndex={0} href="https://www.facebook.com/squadhelpinc">
            <Icon className={styles.icon} path={mdiFacebook} title="link to facebook account" />
          </a>
        </li>
        <li>
          <a tabIndex={0} href="https://twitter.com/squadhelp">
            <Icon className={styles.icon} path={mdiTwitter} title="link to twitter account" />
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default CopyrightAndContactsPanel;
