import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ConfirmPasswordReset.module.sass';

const ConfirmPasswordReset = () => (
  <div className={styles.pageContainer}>
    <div className={styles.text}>
      Your password has been updated successfully!
    </div>
    <div className={styles.text}>
      You can now
      {' '}
      <Link className={styles.loginLink} to="/login">go to Login page</Link>
      .
    </div>
  </div>
);

export default ConfirmPasswordReset;
