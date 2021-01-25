import produce from 'immer';
import PASSWORD_ACTION_TYPES from '../actions/passwordReset/passwordActionTypes';
import createReducer from './helpers/createReducer';

const initialState = {
  isFetching: false,
  error: null,
};

const handlers = {
  [PASSWORD_ACTION_TYPES.PASSWORD_RESET_REQUEST]: produce((draftState) => {
    draftState.isFetching = true;
  }),

  [PASSWORD_ACTION_TYPES.PASSWORD_RESET_REQUEST_SUCCESS]: produce((draftState) => {
    draftState.isFetching = false;
  }),

  [PASSWORD_ACTION_TYPES.PASSWORD_RESET_REQUEST_FAILED]: produce((draftState, action) => {
    const {
      payload: { error },
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),

  [PASSWORD_ACTION_TYPES.PASSWORD_RESET_CONFIRMATION_REQUEST]: produce((draftState) => {
    draftState.isFetching = true;
  }),

  [PASSWORD_ACTION_TYPES.PASSWORD_RESET_CONFIRMATION_REQUEST_SUCCESS]: produce((draftState) => {
    draftState.isFetching = false;
  }),

  [PASSWORD_ACTION_TYPES.PASSWORD_RESET_CONFIRMATION_REQUEST_FAILED]: produce((draftState, action) => {
    const {
      payload: { error },
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),
};

const passwordReducer = createReducer(initialState, handlers);

export default passwordReducer;
