import USER_PROFILE_ACTION_TYPES from './userProfileActionTypes';

export const changeEditModeOnUserProfile = (data) => ({
  type: USER_PROFILE_ACTION_TYPES.CHANGE_EDIT_MODE_ON_USER_PROFILE,
  payload: {
    data,
  },
});
