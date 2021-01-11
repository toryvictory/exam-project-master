import ACTION from '../actions/actionTypes';
import USER_PROFILE_ACTION_TYPES from '../actions/userProfile/userProfileActionTypes';
import CONSTANTS from '../constants';

const initialState = {
  profileModeView: CONSTANTS.USER_INFO_MODE,
  isEdit: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CHANGE_PROFILE_MODE_VIEW: {
      return {
        ...state,
        profileModeView: action.data,
      };
    }
    case USER_PROFILE_ACTION_TYPES.CHANGE_EDIT_MODE_ON_USER_PROFILE: {
      return {
        ...state,
        isEdit: action.payload.data,
      };
    }
    default:
      return state;
  }
}
