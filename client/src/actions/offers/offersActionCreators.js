import OFFERS_ACTION_TYPES from './offersActionTypes';

/**
 *
 * @typedef {object} Action
 * @property {string} type
 * @property {object} [payload]
 */

/**
 *
 * @returns {Action}
 */
export const getOffers = () => ({
  type: OFFERS_ACTION_TYPES.GET_OFFERS,
});

/**
 *
 * @returns {Action}
 */
export const getOffersRequest = () => ({
  type: OFFERS_ACTION_TYPES.GET_OFFERS_REQUEST,
});

/**
 *
 * @param {Array} data
 * @returns {Action}
 */
export const getOffersRequestSuccess = (data) => ({
  type: OFFERS_ACTION_TYPES.GET_OFFERS_REQUEST_SUCCESS,
  payload: {
    data,
  },
});

/**
 *
 * @param {object} err
 * @returns {Action}
 */
export const getOffersRequestFailed = (err) => ({
  type: OFFERS_ACTION_TYPES.GET_OFFERS_REQUEST_FAILED,
  payload: {
    error: err,
  },
});
