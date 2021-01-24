import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { loginRequest, signUpRequest } from '../../actions/auth/authActionCreators';
import SignInForm from '../../components/forms/SignInForm';
import SignUpForm from '../../components/forms/SignUpForm';
import { userSelector } from '../../selectors';
import styles from './AuthPage.module.sass';
import CONSTANTS from '../../constants';
import RegistrationPageFAQ from '../../components/RegistrationPageFAQ/RegistrationPageFAQ';

function AuthPage() {
  const [isLogin, setIsLogin] = useState();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const location = useLocation();

  useLayoutEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  const Form = isLogin ? SignInForm : SignUpForm;

  const handleSubmit = useCallback(
    (values) => {
      dispatch(isLogin ? loginRequest(values) : signUpRequest(values));
    },
    [isLogin, dispatch],
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

              <Link to={isLogin ? '/signup' : '/login'} style={{ textDecoration: 'none' }}>
                <span>
                  {isLogin ? 'SIGN UP' : 'LOGIN'}
                  {' '}
                </span>
              </Link>
            </div>
          </div>
          <div className={styles.formContainer}>
            <Form onSubmit={handleSubmit} />
          </div>
        </div>
        { !isLogin
            && <RegistrationPageFAQ /> }
      </div>
    </>
  );
}

export default AuthPage;
