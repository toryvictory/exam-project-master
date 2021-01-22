import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiClockTimeFourOutline } from '@mdi/js';
import styles from './EventsContainer.module.sass';
import { getEvents } from '../../actions/events/eventsActionCreators';
import Event from '../Event/Event';

const EventsContainer = ({ userId }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getEvents(userId));
  }, []);

  const events = useSelector((state) => state.eventsStore.events);

  if (events.length > 0) {
    return (
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>Your events</h1>
          <div className={styles.subHeading}>
            <span>Remaining time </span>
            <Icon
              className={styles.icon}
              path={mdiClockTimeFourOutline}
              title="clock"
              size={1}
            />
          </div>
        </div>
        <ul>
          {events.length ? events.map((i) => <li key={`${i.eventId}${i.userId}`}><Event event={i} /></li>) : null}
        </ul>
      </div>
    );
  } return null;
};

EventsContainer.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default EventsContainer;
