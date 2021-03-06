import PASSWORD_ACTION_TYPES from './passwordActionTypes';

/**
 *
 * @typedef {object} Action
 * @property {string} type
 * @property {object} [payload]
 */

/**
 *
 * @param {object} values
 * @param {string} values.email
 * @param {string} values.password
 * @returns {Action}
 */
export const passwordReset = (values) => ({
  type: PASSWORD_ACTION_TYPES.PASSWORD_RESET,
  payload: {
    values,
  },
});

/**
 *
 * @returns {Action}
 */
export const passwordResetRequest = () => ({
  type: PASSWORD_ACTION_TYPES.PASSWORD_RESET_REQUEST,
});

/**
 *
 * @returns {Action}
 */
export const passwordResetRequestSuccess = () => ({
  type: PASSWORD_ACTION_TYPES.PASSWORD_RESET_REQUEST_SUCCESS,
});

/**
 *
 * @param {object} err
 * @returns {Action}
 */
export const passwordResetRequestFailed = (err) => ({
  type: PASSWORD_ACTION_TYPES.PASSWORD_RESET_REQUEST_FAILED,
  payload: {
    error: err,
  },
});

/**
 *
 * @param {string} token
 * @returns {Action}
 */
export const passwordResetConfirmation = (token) => ({
  type: PASSWORD_ACTION_TYPES.PASSWORD_RESET_CONFIRMATION,
  payload: {
    token,
  },
});

/**
 *
 * @returns {Action}
 */
export const passwordResetConfirmationRequest = () => ({
  type: PASSWORD_ACTION_TYPES.PASSWORD_RESET_CONFIRMATION_REQUEST,
});

/**
 *
 * @returns {Action}
 */
export const passwordResetConfirmationRequestSuccess = () => ({
  type: PASSWORD_ACTION_TYPES.PASSWORD_RESET_CONFIRMATION_REQUEST_SUCCESS,
});

/**
 *
 * @param {object} err
 * @returns {Action}
 */
export const passwordResetConfirmationRequestFailed = (err) => ({
  type: PASSWORD_ACTION_TYPES.PASSWORD_RESET_CONFIRMATION_REQUEST_FAILED,
  payload: {
    error: err,
  },
});
