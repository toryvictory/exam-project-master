import { put } from 'redux-saga/effects';
import * as PasswordActionCreators from '../actions/passwordReset/passwordActionCreators';
import passwordApi from '../api/http';

export function* resetPasswordSaga(action) {
  yield put(PasswordActionCreators.passwordResetRequest());
  try {
    const {
      payload: { values },
    } = action;
    yield passwordApi.resetPassword(values);
    yield put(PasswordActionCreators.passwordResetRequestSuccess());
  } catch (err) {
    yield put(PasswordActionCreators.passwordResetRequestFailed(err));
  }
}

export function* confirmPasswordResetSaga(action) {
  yield put(PasswordActionCreators.passwordResetConfirmationRequest());
  try {
    const {
      payload: { token },
    } = action;
    yield passwordApi.resetPassword(token);
    yield put(PasswordActionCreators.passwordResetConfirmationRequestSuccess());
  } catch (err) {
    yield put(PasswordActionCreators.passwordResetConfirmationRequestFailed(err));
  }
}
