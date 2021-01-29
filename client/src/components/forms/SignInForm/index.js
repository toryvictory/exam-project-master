import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './SignInForm.module.sass';
import { authSelector } from '../../../selectors';
import Error from '../../Error/Error';
import { logoutRequest } from '../../../actions/auth/authActionCreators';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().trim().email().required(),
  password: Yup.string().required(),
});

const passwordRule = [
  /(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])^.{8,255}$/,
  'Your password must be at least 8 characters, and include at least one lowercase letter, one uppercase letter, and a number. ',
];

const validationSchemaResetPassword = Yup.object({
  email: Yup.string().trim().email().required(),
  password: Yup.string()
    .matches(...passwordRule)
    .required(),
});

function SignInForm(props) {
  const { onSubmit, isPassReset } = props;

  const handleSubmit = useCallback(
    (values) => {
      onSubmit(values);
    },
    [onSubmit],
  );

  const { error, isFetching } = useSelector(authSelector);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={isPassReset ? validationSchemaResetPassword : validationSchema}
    >
      {({ touched, errors }) => {
        const emailFieldClasses = classNames(styles.input,
          { [styles.notValid]: errors.email && touched.email });
        const passwordFieldClasses = classNames(styles.input,
          { [styles.notValid]: errors.password && touched.password });

        return (
          <div className={classNames(styles.loginForm, { [styles.resetForm]: isPassReset })}>
            {error && (
            <Error
              data={error.response.data}
              status={error.response.status}
              clearError={() => dispatch(logoutRequest())}
            />
            )}
            <h2>{isPassReset ? 'CHANGE YOUR PASSWORD' : 'LOGIN TO YOUR ACCOUNT'}</h2>
            <Form>
              <div className={styles.inputContainer}>
                <Field
                  name="email"
                  placeholder="Email address"
                  className={emailFieldClasses}
                />
                { errors.email && touched.email
                  ? (<div className={styles.fieldWarning}>{errors.email}</div>)
                  : null }
              </div>
              <div className={styles.inputContainer}>
                <Field
                  name="password"
                  placeholder={isPassReset ? 'Your new password' : 'Password'}
                  className={passwordFieldClasses}
                />
                { errors.password && touched.password
                  ? (<div className={styles.fieldWarning}>{errors.password}</div>)
                  : null }
              </div>
              { !isPassReset && <Link className={styles.resetLink} to="/resetPassword">Forgot your password?</Link>}
              <button type="submit" className={styles.submitContainer}>
                <span className={styles.inscription}>
                  {isFetching ? 'Submitting...' : (isPassReset ? 'RESET PASSWORD' : 'LOGIN')}
                </span>
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isPassReset: PropTypes.bool,
};

SignInForm.defaultProps = {
  isPassReset: false,
};

export default SignInForm;
