import React from 'react';
import styles from './GetInTouchPanel.module.sass';

const GetInTouchPanel = () => (
  <section className={styles.sectionContainer}>
    <div className={styles.contentContainer}>
      <article className={styles.articleContainer}>
        <h3 className={styles.heading}>Questions?</h3>
        <p className={styles.text}>
          Check out our
          <a className={styles.anchor} target="_blank" href="http://help.squadhelp.com">FAQs</a>
          {' '}
          or send us a
          <a className={styles.anchor} target="_blank" href="https://www.squadhelp.com/">message</a>
          . For assistance with launching a contest, you can also call us at (877)&nbsp;355-3585 or schedule a
          <a className={styles.anchor} target="_blank" href="https://www.squadhelp.com/howitworks.php"> Branding Consultation</a>
          .
        </p>
      </article>
      <button className={styles.getInTouchButton}>GET IN TOUCH</button>
    </div>
  </section>
);

export default GetInTouchPanel;
