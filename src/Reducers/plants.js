import { handleActions } from 'redux-actions';
import * as types from '../Constants/plants';

const initialState = {
  items: [],
  refreshing: false,
  loading: false,
  cursor: null,
  error: null,
};

export default handleActions(
  {
    [types.PLANTS_GET_SUCCESS]: (state, action) => ({
      ...state,
      items: [...state.items, ...action.payload.items],
      cursor: action.payload.cursor,
      error: null,
    }),

    [types.PLANTS_REFRESH_REQUEST]: state => ({
      ...state,
      refreshing: true,
    }),

    [types.PLANTS_REFRESH_SUCCESS]: (state, action) => ({
      ...state,
      items: action.payload.items,
      cursor: action.payload.cursor,
      refreshing: false,
    }),

    [types.PLANTS_REFRESH_FAILURE]: (state, action) => ({
      ...state,
      refreshing: false,
      error: action.error,
    }),

    [types.PLANTS_ADD_REQUEST]: state => ({
      ...state,
      loading: true,
      error: null,
    }),

    [types.PLANTS_ADD_SUCCESS]: state => ({
      ...state,
      loading: false,
      error: null,
    }),

    [types.PLANTS_ADD_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
    }),
  },
  initialState
);
