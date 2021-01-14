import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import styles from './TextInput.module.sass';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const inputClasses = classNames(styles.input, { [styles.notValid]: meta.touched && meta.error });
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.id || props.name}>{label}</label>
      <div className={styles.inputContainer}>
        <input className={inputClasses} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={styles.error}>{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default TextInput;
