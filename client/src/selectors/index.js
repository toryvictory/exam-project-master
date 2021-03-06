import { createSelector } from 'reselect';

export const authSelector = (state) => state.auth;

export const userSelector = createSelector(authSelector, (auth) => auth.user);

export const userProfileSelector = (state) => state.userProfile;

export const passwordSelector = (state) => state.password;
