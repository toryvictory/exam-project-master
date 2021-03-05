import produce from 'immer';
import EVENTS_ACTION_TYPES from '../actions/events/eventsActionTypes';
import createReducer from './helpers/createReducer';

const initialState = {
  events: [],
  err: null,
};

const handlers = {

  [EVENTS_ACTION_TYPES.GET_EVENTS_SUCCESS]: produce((draftState, action) => {
    const { payload: { events } } = action;
    draftState.events = events;
  }),

  [EVENTS_ACTION_TYPES.GET_EVENTS_ERROR]: produce((draftState, action) => {
    const { payload: { err } } = action;
    draftState.err = err;
  }),

  [EVENTS_ACTION_TYPES.ADD_EVENT_SUCCESS]: produce((draftState, action) => {
    const { payload: { events } } = action;
    draftState.events = events;
  }),

  [EVENTS_ACTION_TYPES.ADD_EVENT_ERROR]: produce((draftState, action) => {
    const { payload: { err } } = action;
    draftState.err = err;
  }),

  [EVENTS_ACTION_TYPES.DELETE_EVENT_SUCCESS]: produce((draftState, action) => {
    const { payload: { events } } = action;
    draftState.events = events;
  }),

  [EVENTS_ACTION_TYPES.DELETE_EVENT_ERROR]: produce((draftState, action) => {
    const { payload: { err } } = action;
    draftState.err = err;
  }),

};

const eventsReducer = createReducer(initialState, handlers);

export default eventsReducer;
