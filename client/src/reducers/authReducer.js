import produce from 'immer';
import AUTH_ACTION_TYPES from '../actions/auth/authActionTypes';
import EDIT_USER_ACTION_TYPES from "../actions/user/editUserActionTypes";
import createReducer from './helpers/createReducer';

const initialState = {
  user: null,
  isFetching: false,
  error: null,
};

const handlers = {

  [AUTH_ACTION_TYPES.AUTH_REQUEST]: produce(draftState => {
    draftState.isFetching = true;
  }),

  [AUTH_ACTION_TYPES.AUTH_REQUEST_SUCCESS]: produce((draftState, action) => {
    const {
      payload: {
        data: { user },
      },
    } = action;
    draftState.isFetching = false;
    draftState.user = user;
  }),

  [AUTH_ACTION_TYPES.AUTH_REQUEST_FAILED]: produce((draftState, action) => {
    const {
      payload: { error },
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),

  [AUTH_ACTION_TYPES.LOGOUT_REQUEST_SUCCESS]: () => ({
    ...initialState,
  }),

  [EDIT_USER_ACTION_TYPES.UPDATE_USER_DATA_REQUEST]: produce(draftState => {
    draftState.isFetching = true;
  }),

  [EDIT_USER_ACTION_TYPES.UPDATE_USER_DATA_SUCCESS]: produce((draftState, action) => {
    const {
      payload: {
        data,
      },
    } = action;
    draftState.isFetching = false;
    draftState.user = data;
  }),

  [EDIT_USER_ACTION_TYPES.UPDATE_USER_DATA_ERROR]: produce((draftState, action) => {
    const {
       error,
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),
};

const authReducer = createReducer(initialState, handlers);

export default authReducer;
