import React from 'react';
import PropTypes from 'prop-types';
import styles from './DaysHoursMinutesInput.module.sass';
import NumberSelect from '../NumberSelect/NumberSelect';

const DaysHoursMinutesInput = ({ setFieldValue }) => (
  <div className={styles.container}>
    <span>Notify me</span>
    <span>
      <NumberSelect
        min={0}
        max={30}
        onChange={({ target: { value } }) => {
          setFieldValue('notificationDaysEarlier', Number(value));
        }}
      />
    </span>
    <span>days</span>
    <span>
      <NumberSelect
        min={0}
        max={23}
        onChange={({ target: { value } }) => {
          setFieldValue('notificationHoursEarlier', Number(value));
        }}
      />
    </span>
    <span>hours</span>
    <span>
      <NumberSelect
        min={0}
        max={59}
        onChange={({ target: { value } }) => {
          setFieldValue('notificationMinutesEarlier', Number(value));
        }}
      />
    </span>
    <span>minutes</span>
    <span>before the event.</span>
  </div>
);
DaysHoursMinutesInput.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
};

export default DaysHoursMinutesInput;
