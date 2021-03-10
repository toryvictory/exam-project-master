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

/**
 *
 * @param {object} values
 * @param {number} values.id
 * @param {string} values.moderationStatus
 * @returns {Action}
 */
export const changeOfferModerationStatus = (values) => ({
  type: OFFERS_ACTION_TYPES.CHANGE_OFFER_MODERATION_STATUS,
  payload: {
    values,
  },
});

/**
 *
 * @param {object} values
 * @returns {Action}
 */
export const changeOfferModerationStatusRequest = () => ({
  type: OFFERS_ACTION_TYPES.CHANGE_OFFER_MODERATION_STATUS_REQUEST,
});

/**
 *
 * @param {object} data
 * @returns {Action}
 */
export const changeOfferModerationStatusRequestSuccess = (data) => ({
  type: OFFERS_ACTION_TYPES.CHANGE_OFFER_MODERATION_STATUS_REQUEST_SUCCESS,
  payload: {
    data,
  },
});

/**
 *
 * @param {object} err
 * @returns {Action}
 */
export const changeOfferModerationStatusRequestFailed = (err) => ({
  type: OFFERS_ACTION_TYPES.CHANGE_OFFER_MODERATION_STATUS_REQUEST_FAILED,
  payload: {
    error: err,
  },
});
