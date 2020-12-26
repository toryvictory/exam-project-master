import {put} from "redux-saga/effects";
import * as restController from "../api/rest/restController";
import * as EDIT_USER_ACTION_CREATORS from "../actions/user/editUserActionCreators";

export function* updateUserData(action) {
    try {
        yield put(EDIT_USER_ACTION_CREATORS.updateUserDataRequest());
        const { data : { user } } = yield restController.updateUser(action.payload.values);
        yield put(EDIT_USER_ACTION_CREATORS.updateUserDataSuccess(user));
    } catch (e) {
        yield put(EDIT_USER_ACTION_CREATORS.updateUserDataError(e));
    }
}