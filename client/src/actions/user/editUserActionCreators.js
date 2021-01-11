import EDIT_USER_ACTION_TYPES from './editUserActionTypes';

export const updateUserData = (values) => ({
  type: EDIT_USER_ACTION_TYPES.UPDATE_USER_DATA,
  payload: {
    values,
  },
});

export const updateUserDataRequest = () => ({
  type: EDIT_USER_ACTION_TYPES.UPDATE_USER_DATA_REQUEST,
});

export const updateUserDataSuccess = (data) => ({
  type: EDIT_USER_ACTION_TYPES.UPDATE_USER_DATA_SUCCESS,
  payload: {
    data,
  },
});

export const updateUserDataError = (err) => ({
  type: EDIT_USER_ACTION_TYPES.UPDATE_USER_DATA_ERROR,
  payload: {
    error: err,
  },
});
