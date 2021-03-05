import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  formatDuration, intervalToDuration, isBefore,
} from 'date-fns';
import { useDispatch } from 'react-redux';
import styles from './Timer.module.sass';
import { toggleEventNotification } from '../../actions/events/eventsActionCreators';

const Timer = ({ event }) => {
  const {
    timerStartDate,
    eventDateTime,
    notificationDate,
    isNotificationOn,
  } = event;
  const [start, setStart] = useState(() => Date.now());
  const [isRunning, setIsRunning] = useState(true);
  const [isToBeNotified, setIsToBeNotified] = useState(false);

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
    if (!isBefore(start, eventDateTime)) {
      setIsRunning(false);
      setStart(eventDateTime);
    }
  }, [start]);

  useEffect(() => {
    if (!isBefore(start, notificationDate) && !isNotificationOn) {
      setIsToBeNotified(true);
    }
  }, [start]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isToBeNotified) {
      dispatch(toggleEventNotification(event));
    }
  }, [isToBeNotified]);

  const calculateTimeLeft = (startDate) => intervalToDuration({
    start: startDate,
    end: eventDateTime,
  });

  return (
    <div className={styles.timerContainer}>
      <div
        className={styles.progressBar}
        style={{ width: `${Math.ceil(((start - timerStartDate) / (eventDateTime - timerStartDate)) * 100)}%` }}
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
  event: PropTypes.shape({
    eventName: PropTypes.string.isRequired,
    eventDateTime: PropTypes.instanceOf(Date).isRequired,
    timerStartDate: PropTypes.instanceOf(Date).isRequired,
    notificationDate: PropTypes.instanceOf(Date).isRequired,
    eventId: PropTypes.string.isRequired,
    isNotificationOn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Timer;
