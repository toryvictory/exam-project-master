import {put} from "redux-saga/effects";
import * as API from "../api/http";
import * as EDIT_USER_ACTION_CREATORS from "../actions/user/editUserActionCreators";

export function* updateUserData(action) {
    try {
        yield put(EDIT_USER_ACTION_CREATORS.updateUserDataRequest());

        const {
            payload:
                { values }
        } = action;

        const {
            data:
                { user }
        } = yield API.userApi.updateUser(values);

        yield put(EDIT_USER_ACTION_CREATORS.updateUserDataSuccess(user));
    } catch (e) {
        yield put(EDIT_USER_ACTION_CREATORS.updateUserDataError(e));
    }
}