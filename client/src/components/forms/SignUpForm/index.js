import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field} from 'formik';
import { ROLES } from '../../../constants';
import styles from "./SignUpForm.module.sass";
import classNames from "classnames";
import Error from "../../Error/Error";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../../selectors";
import {logoutRequest} from "../../../actions/auth/authActionCreators";

const initialValues = {
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: ROLES.CUSTOMER,
};

const passwordRule = [
  /(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])^.{8,255}$/,
  'Your password must be at least 8 characters, and include at least one lowercase letter, one uppercase letter, and a number. ',
];

const roles = Object.values(ROLES);

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required(),
  lastName: Yup.string().trim().required(),
  displayName: Yup.string().trim().required(),
  email: Yup.string().trim().email().required(),
  password: Yup.string()
    .matches(...passwordRule)
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required(),
  role: Yup.string().oneOf(roles).required(),
});

function SignUpForm(props) {
  const { onSubmit } = props;

  const handleSubmit = useCallback(
    (values, formikBag) => {
      onSubmit(values);
    },
    [onSubmit]
  );

  const { error, isFetching } = useSelector(authSelector);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({errors, touched}) => (
          <div className={styles.signUpFormContainer}>
            {error && (
                <Error
                    data={error.response.data}
                    status={error.response.status}
                    clearError={()=>dispatch(logoutRequest())}
                />
            )}
          <div className={styles.headerFormContainer}>
            <h2>CREATE AN ACCOUNT</h2>
            <h4>We always keep your name and email address private.</h4>
          </div>
        <Form>
        <div className={styles.row}>
          <div className={styles.inputContainer}>
          <Field name="firstName" placeholder="First name"
                 className={classNames(styles.input, {[styles.notValid]: errors.firstName && touched.firstName })}
          />
            { errors.firstName && touched.firstName ?
                (<div className={styles.fieldWarning}>{errors.firstName}</div>)
                : null }
          </div>
          <div className={styles.inputContainer}>
          <Field name="lastName" placeholder="Last name"
                 className={classNames(styles.input, {[styles.notValid]: errors.lastName && touched.lastName })} />
            { errors.lastName && touched.lastName ?
                (<div className={styles.fieldWarning}>{errors.lastName}</div>)
                : null }
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.inputContainer}>
          <Field name="displayName" placeholder="Display name"
                 className={classNames(styles.input, {[styles.notValid]: errors.displayName && touched.displayName })} />
            { errors.displayName && touched.displayName ?
                (<div className={styles.fieldWarning}>{errors.displayName}</div>)
                : null }
          </div>
          <div className={styles.inputContainer}>
          <Field name="email" placeholder="Email address"
                 className={classNames(styles.input, {[styles.notValid]: errors.email && touched.email })} />
            { errors.email && touched.email ?
                (<div className={styles.fieldWarning}>{errors.email}</div>)
                : null }
          </div>
          </div>
        <div className={styles.row}>
          <div className={styles.inputContainer}>
          <Field name="password" placeholder="Password"
                 className={classNames(styles.input, {[styles.notValid]: errors.password && touched.password })} />
            { errors.password && touched.password ?
                (<div className={styles.fieldWarning}>{errors.password}</div>)
                : null }
          </div>
          <div className={styles.inputContainer}>
          <Field name="confirmPassword" placeholder="Confirm password"
                 className={classNames(styles.input, {[styles.notValid]: errors.confirmPassword && touched.confirmPassword })} />
            { errors.confirmPassword && touched.confirmPassword ?
                (<div className={styles.fieldWarning}>{errors.confirmPassword}</div>)
                : null }
          </div>
          </div>

          {roles.map(r => (
            <div className={styles.choseRoleContainer} key={r}>
              <label>
                <Field name="role" type="radio" value={r} />
                <span className={styles.radioLabel}>{`Join as a ${r}`}</span>
              </label>
              <br />
            </div>
          ))}
          <button type="submit" className={styles.submitContainer}>
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'Create Account'}
            </span>
        </button>
        </Form>
          </div>
      )}
    </Formik>

  );
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
