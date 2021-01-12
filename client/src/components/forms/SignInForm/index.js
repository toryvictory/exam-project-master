import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
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

function SignInForm(props) {
  const { onSubmit } = props;

  const handleSubmit = useCallback(
    (values, formikBag) => {
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
      validationSchema={validationSchema}
    >
      {({ touched, errors, isSubmitting }) => (
        <div className={styles.loginForm}>
          {error && (
            <Error
              data={error.response.data}
              status={error.response.status}
              clearError={() => dispatch(logoutRequest())}
            />
          )}
          <h2>LOGIN TO YOUR ACCOUNT</h2>
          <Form>
            <div className={styles.inputContainer}>
              <Field
                name="email"
                placeholder="Email address"
                className={classNames(styles.input, { [styles.notValid]: errors.email && touched.email })}
              />
              { errors.email && touched.email
                ? (<div className={styles.fieldWarning}>{errors.email}</div>)
                : null }
            </div>
            <div className={styles.inputContainer}>
              <Field
                name="password"
                placeholder="Password"
                className={classNames(styles.input, { [styles.notValid]: errors.password && touched.password })}
              />
              { errors.password && touched.password
                ? (<div className={styles.fieldWarning}>{errors.password}</div>)
                : null }
            </div>
            <button type="submit" className={styles.submitContainer}>
              <span className={styles.inscription}>
                {isFetching ? 'Submitting...' : 'LOGIN'}
              </span>
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignInForm;
