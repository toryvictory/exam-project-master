import React from 'react';
import styles from './StartContestButton.module.sass';

const StartContestButton = () => (
  <div className={styles.buttonContainer}>
    <button className={styles.startButton}>START A CONTEST</button>
  </div>
);

export default StartContestButton;
