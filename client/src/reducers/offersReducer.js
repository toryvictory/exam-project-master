import produce from 'immer';
import createReducer from './helpers/createReducer';
import OFFERS_ACTION_TYPES from '../actions/offers/offersActionTypes';

const initialState = {
  offers: [],
  isFetching: false,
  error: null,
};

const handlers = {

  [OFFERS_ACTION_TYPES.GET_OFFERS_REQUEST]: produce((draftState) => {
    draftState.isFetching = true;
  }),

  [OFFERS_ACTION_TYPES.GET_OFFERS_REQUEST_SUCCESS]: produce((draftState, action) => {
    const {
      payload: {
        data,
      },
    } = action;
    draftState.isFetching = false;
    draftState.offers = data;
  }),

  [OFFERS_ACTION_TYPES.GET_OFFERS_REQUEST_FAILED]: produce((draftState, action) => {
    const {
      payload: { error },
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),

  [OFFERS_ACTION_TYPES.CHANGE_OFFER_MODERATION_STATUS_REQUEST]: produce((draftState) => {
    draftState.isFetching = true;
  }),

  [OFFERS_ACTION_TYPES.CHANGE_OFFER_MODERATION_STATUS_REQUEST_SUCCESS]: produce((draftState, action) => {
    const {
      payload: {
        data,
      },
    } = action;
    draftState.isFetching = false;
    const index = draftState.offers.findIndex((offer) => offer.id === data.id);
    draftState.offers[index] = data;
  }),

  [OFFERS_ACTION_TYPES.CHANGE_OFFER_MODERATION_STATUS_REQUEST_FAILED]:
    produce((draftState, action) => {
      const {
        payload: { error },
      } = action;
      draftState.isFetching = false;
      draftState.error = error;
    }),
};

const offersReducer = createReducer(initialState, handlers);

export default offersReducer;
