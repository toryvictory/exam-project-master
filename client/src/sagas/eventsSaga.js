import { put } from 'redux-saga/effects';
import { parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import {
  getEventsSuccess,
  getEventsError,
  addEventSuccess,
  addEventError,
  deleteEventSuccess,
  deleteEventError,
} from '../actions/events/eventsActionCreators';

const getEvents = (userId) => {
  let events;
  if (userId) {
    if (localStorage.getItem(`Events for user ${userId}`)) {
      events = JSON.parse(localStorage.getItem(`Events for user ${userId}`));
      for (let i = 0; i < events.length; i++) {
        events[i].eventDateTime = parseISO(events[i].eventDateTime);
        events[i].timerStartDate = parseISO(events[i].timerStartDate);
        events[i].notificationDate = parseISO(events[i].notificationDate);
      }
    } else {
      events = [];
    }
    return events;
  }
  throw Error('User is not defined');
};

export function* getEventsSaga(action) {
  try {
    const { payload: { userId } } = action;
    const events = getEvents(userId);
    yield put(getEventsSuccess(events));
  } catch (err) {
    yield put(getEventsError(err));
  }
}

export function* addEventSaga(action) {
  try {
    const { payload: { event } } = action;
    const { userId } = event;
    const events = getEvents(userId);

    event.eventId = uuidv4();
    events.push(event);
    events.sort(((a, b) => a.eventDateTime - b.eventDateTime));
    localStorage.setItem(`Events for user ${userId}`, JSON.stringify(events));

    yield put(addEventSuccess(events));
  } catch (err) {
    yield put(addEventError(err));
  }
}

export function* deleteEventSaga(action) {
  try {
    const { payload: { event } } = action;
    const { userId } = event;
    const events = getEvents(userId);

    for (let i = 0; i < events.length; i++) {
      if (event.eventId === events[i].eventId) {
        events.splice(i, 1);
      }
    }

    localStorage.setItem(`Events for user ${userId}`, JSON.stringify(events));
    yield put(deleteEventSuccess(events));
  } catch (err) {
    yield put(deleteEventError(err));
  }
}

export function* toggleEventNotificationSaga(action) {
  try {
    const { payload: { event } } = action;
    const { userId } = event;
    const events = getEvents(userId);

    for (let i = 0; i < events.length; i++) {
      if (event.eventId === events[i].eventId) {
        events[i].isNotificationOn = !events[i].isNotificationOn;
      }
    }

    localStorage.setItem(`Events for user ${userId}`, JSON.stringify(events));
    yield put(deleteEventSuccess(events));
  } catch (err) {
    yield put(deleteEventError(err));
  }
}
