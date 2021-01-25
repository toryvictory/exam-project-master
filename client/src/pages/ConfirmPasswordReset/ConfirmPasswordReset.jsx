import React, { useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { passwordResetConfirmation } from '../../actions/passwordReset/passwordActionCreators';
import styles from './ConfirmPasswordReset.module.sass';
import * as selectors from '../../selectors';
import Spinner from '../../components/Spinner/Spinner';

const ConfirmPasswordReset = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(passwordResetConfirmation(token));
  }, [dispatch]);

  const { isFetching } = useSelector(selectors.passwordSelector);

  if (isFetching) {
    return <Spinner />;
  }

  return (
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
};

export default ConfirmPasswordReset;
