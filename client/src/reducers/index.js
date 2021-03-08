import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import dataForContestReducer from './dataForContestReducer';
import payReducer from './payReducer';
import getContestsReducer from './getContestsReducer';
import storeContestReducer from './storeContestReducer';
import bundleReducer from './bundleReducer';
import getContestByIdReducer from './getContestByIdReducer';
import updateContestReducer from './updateContestReducer';
import chatReducer from './chatReducer';
import userProfileReducer from './userProfileReducer';
import eventsReducer from './eventsReducer';
import passwordReducer from './passwordReducer';
import offersReducer from './offersReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer, // quality mark
  dataForContest: dataForContestReducer,
  payment: payReducer,
  contestByIdStore: getContestByIdReducer,
  contestsList: getContestsReducer,
  contestStore: storeContestReducer,
  bundleStore: bundleReducer,
  updateContestStore: updateContestReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
  password: passwordReducer,
  eventsStore: eventsReducer,
  offersStore: offersReducer,
});

export default rootReducer;
