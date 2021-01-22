import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TextInput.module.sass';

const TextInput = ({
  label, containerClass, labelClass, inputContainerClass, ...props
}) => {
  const [field, meta] = useField(props);
  const inputClasses = classNames(styles.input, { [styles.notValid]: meta.touched && meta.error });
  return (
    <div className={containerClass || styles.container}>
      <label className={labelClass || styles.label} htmlFor={props.id || props.name}>{label}</label>
      <div className={inputContainerClass || styles.inputContainer}>
        <input className={inputClasses} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={styles.error}>{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputContainerClass: PropTypes.string,
};

TextInput.defaultProps = {
  label: null,
  containerClass: '',
  labelClass: '',
  inputContainerClass: '',
};

export default TextInput;
