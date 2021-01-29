import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './RequestSentPage.module.sass';
import { passwordSelector } from '../../selectors';
import Spinner from '../Spinner/Spinner';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';

const RequestSentPage = () => {
  const { isFetching, error } = useSelector(passwordSelector);
  if (isFetching) {
    return <Spinner />;
  }
  if (error?.response) {
    return <ErrorPage errorMessage={`${error.response.status} ${error.response.data.errors[0]?.message}`} />;
  }
  if (error) {
    return <ErrorPage errorMessage={error.message} />;
  }
  return (
    <div className={styles.pageContainer}>
      <div className={styles.text}>
        Your password change request has been successfully sent.
        Please check your email for further instructions.
      </div>
      <Link to="/" className={styles.button} tabIndex={0}>Go Home</Link>
    </div>
  );
};

export default RequestSentPage;
