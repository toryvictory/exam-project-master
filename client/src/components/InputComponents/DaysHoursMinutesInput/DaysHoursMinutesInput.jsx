import React from 'react';
import PropTypes from 'prop-types';
import styles from '../TextInput/TextInput.module.sass';

const DaysHoursMinutesInput = ({ setFieldValue }) => (
  <div className={styles.container}>
    <div className={styles.inputContainer}>
      <input
        type="number"
        min={0}
        max={30}
        onChange={({ target: { value } }) => {
          setFieldValue('notificationDaysEarlier', Number(value));
        }}
      />
      <span>days</span>
      <input
        type="number"
        min={0}
        max={23}
        onChange={({ target: { value } }) => {
          setFieldValue('notificationHoursEarlier', Number(value));
        }}
      />
      <span>hours</span>
      <input
        type="number"
        min={0}
        max={59}
        onChange={({ target: { value } }) => {
          setFieldValue('notificationMinutesEarlier', Number(value));
        }}
      />
      <span>minutes</span>
    </div>
  </div>
);
DaysHoursMinutesInput.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
};

export default DaysHoursMinutesInput;
