import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import { mdiDeleteForeverOutline } from '@mdi/js';
import styles from './Event.module.sass';
import Timer from '../Timer/Timer';
import { deleteEvent } from '../../actions/events/eventsActionCreators';

const Event = ({ event }) => {
  const {
    eventName,
  } = event;
  const dispatch = useDispatch();
  return (
    <div className={styles.eventContainer}>
      <div className={styles.name}>
        {eventName}
      </div>
      <Timer event={event} />
      <button className={styles.deleteButton} type="button" onClick={() => dispatch(deleteEvent(event))}>
        <Icon path={mdiDeleteForeverOutline} size={1} />
      </button>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string.isRequired,
    eventDateTime: PropTypes.instanceOf(Date).isRequired,
    timerStartDate: PropTypes.instanceOf(Date).isRequired,
    notificationDate: PropTypes.instanceOf(Date).isRequired,
    eventId: PropTypes.string.isRequired,
  }).isRequired,
};

export default Event;
