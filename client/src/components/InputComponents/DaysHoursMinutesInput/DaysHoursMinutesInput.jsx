import React from 'react';
import PropTypes from 'prop-types';
import styles from '../TextInput/TextInput.module.sass';
import NumberSelect from '../NumberSelect/NumberSelect';

const DaysHoursMinutesInput = ({ setFieldValue }) => (
  <div className={styles.container}>
    <span>Notify me</span>
    <div className={styles.inputContainer}>
      <NumberSelect
        min={0}
        max={30}
        onChange={({ target: { value } }) => {
          setFieldValue('notificationDaysEarlier', Number(value));
        }}
      />
      <span>days</span>
      <NumberSelect
        min={0}
        max={23}
        onChange={({ target: { value } }) => {
          setFieldValue('notificationHoursEarlier', Number(value));
        }}
      />
      <span>hours</span>
      <NumberSelect
        min={0}
        max={59}
        onChange={({ target: { value } }) => {
          setFieldValue('notificationMinutesEarlier', Number(value));
        }}
      />
      <span>minutes </span>
      <span>before the event.</span>
    </div>
  </div>
);
DaysHoursMinutesInput.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
};

export default DaysHoursMinutesInput;
