import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { loginRequest, signUpRequest } from '../../actions/auth/authActionCreators';
import { passwordReset } from '../../actions/passwordReset/passwordActionCreators';
import SignInForm from '../../components/forms/SignInForm';
import SignUpForm from '../../components/forms/SignUpForm';
import { userSelector } from '../../selectors';
import styles from './AuthPage.module.sass';
import CONSTANTS from '../../constants';
import RegistrationPageFAQ from '../../components/RegistrationPageFAQ/RegistrationPageFAQ';

function AuthPage() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.pathname.substring(1));

  useLayoutEffect(() => {
    setPage(location.pathname.substring(1));
  }, [location.pathname]);

  let Form;
  let actionCreator;

  switch (page) {
    case 'login':
      Form = SignInForm;
      actionCreator = loginRequest;
      break;
    case 'signup':
      Form = SignUpForm;
      actionCreator = signUpRequest;
      break;
    case 'resetPassword':
      Form = SignInForm;
      actionCreator = passwordReset;
      break;
    default:
  }

  const handleSubmit = useCallback(
    (values) => {
      dispatch(actionCreator(values));
    },
    [dispatch, actionCreator],
  );

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className={styles.signUpPage}>
        <div className={styles.signUpContainer}>
          <div className={styles.headerSignUpPage}>
            <Link to="/">
              <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
            </Link>
            <div className={styles.linkLoginContainer}>

              <Link to={page === 'login' ? '/signup' : '/login'} style={{ textDecoration: 'none' }}>
                <span>
                  {page === 'login' ? 'SIGN UP' : 'LOGIN'}
                  {' '}
                </span>
              </Link>
            </div>
          </div>
          <div className={styles.formContainer}>
            <Form onSubmit={handleSubmit} isPassReset={page === 'resetPassword'} />
          </div>
        </div>
        { page === 'signup'
            && <RegistrationPageFAQ /> }
      </div>
    </>
  );
}

export default AuthPage;
