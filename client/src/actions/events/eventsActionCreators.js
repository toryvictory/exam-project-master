import EVENTS_ACTION_TYPES from './eventsActionTypes';

export const getEvents = (userId) => ({
  type: EVENTS_ACTION_TYPES.GET_EVENTS,
  payload: {
    userId,
  },
});

export const getEventsSuccess = (events) => ({
  type: EVENTS_ACTION_TYPES.GET_EVENTS_SUCCESS,
  payload: {
    events,
  },
});

export const getEventsError = (err) => ({
  type: EVENTS_ACTION_TYPES.GET_EVENTS_ERROR,
  payload: {
    err,
  },
});

export const addEvent = (event) => ({
  type: EVENTS_ACTION_TYPES.ADD_EVENT,
  payload: {
    event,
  },
});

export const addEventSuccess = (events) => ({
  type: EVENTS_ACTION_TYPES.ADD_EVENT_SUCCESS,
  payload: {
    events,
  },
});

export const addEventError = (err) => ({
  type: EVENTS_ACTION_TYPES.ADD_EVENT_ERROR,
  payload: {
    err,
  },
});

export const deleteEvent = (event) => ({
  type: EVENTS_ACTION_TYPES.DELETE_EVENT,
  payload: {
    event,
  },
});

export const deleteEventSuccess = (events) => ({
  type: EVENTS_ACTION_TYPES.DELETE_EVENT_SUCCESS,
  payload: {
    events,
  },
});

export const deleteEventError = (err) => ({
  type: EVENTS_ACTION_TYPES.DELETE_EVENT_ERROR,
  payload: {
    err,
  },
});
