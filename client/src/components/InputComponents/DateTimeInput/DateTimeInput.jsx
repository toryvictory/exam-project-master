import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import Datetime from 'react-datetime';
import styles from '../TextInput/TextInput.module.sass';

const DateTimeInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const inputClasses = classNames(styles.input, { [styles.notValid]: meta.touched && meta.error });
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.id || props.name}>{label}</label>
      <div className={styles.inputContainer}>
        <Datetime
          inputProps={{ className: inputClasses, readOnly: true }}
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className={styles.error}>{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default DateTimeInput;
