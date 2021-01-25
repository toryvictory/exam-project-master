import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ErrorPage.module.sass';

const ErrorPage = ({ errorMessage }) => (
  <div className={styles.pageContainer}>
    <div className={styles.text}>
      Oops... Something went wrong.
    </div>
    <div className={styles.error}>{errorMessage}</div>
    <Link to="/" className={styles.button} tabIndex={0}>Go Home</Link>
  </div>
);

ErrorPage.propTypes = {
  errorMessage: PropTypes.string,
};

ErrorPage.defaultProps = {
  errorMessage: null,
};

export default ErrorPage;
