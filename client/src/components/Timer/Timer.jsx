import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  formatDuration, intervalToDuration, isBefore,
} from 'date-fns';
import styles from './Timer.module.sass';

const Timer = ({ timerStartDate, dueDate }) => {
  const [start, setStart] = useState(() => Date.now());
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setStart((prevValue) => prevValue + 1000);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  useEffect(() => {
    if (!isBefore(start, dueDate)) {
      setIsRunning(false);
      setStart(dueDate);
    }
  }, [start]);

  const calculateTimeLeft = (startDate) => intervalToDuration({
    start: startDate,
    end: dueDate,
  });

  return (
    <div className={styles.timerContainer}>
      <div
        className={styles.progressBar}
        style={{ width: `${Math.ceil(((start - timerStartDate) / (dueDate - timerStartDate)) * 100)}%` }}
      />
      <div className={styles.timer}>
        {formatDuration(calculateTimeLeft(start))
          .replace(/ hours?/, 'h')
          .replace(/ minutes?/, 'm')
          .replace(/ seconds?/, 's')}
      </div>
    </div>
  );
};

Timer.propTypes = {
  timerStartDate: PropTypes.instanceOf(Date).isRequired,
  dueDate: PropTypes.instanceOf(Date).isRequired,
};

export default Timer;
