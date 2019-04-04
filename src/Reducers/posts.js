import { handleActions } from 'redux-actions';
import * as types from '../Constants/posts';

const initialState = {
  items: [],
  refreshing: false,
  loading: false,
  cursor: null,
  error: null,
};

export default handleActions(
  {
    [types.POSTS_GET_SUCCESS]: (state, action) => ({
      ...state,
      items: [...state.items, ...action.payload.items],
      cursor: action.payload.cursor,
      error: null,
    }),

    [types.POSTS_REFRESH_REQUEST]: state => ({
      ...state,
      refreshing: true,
    }),

    [types.POSTS_REFRESH_SUCCESS]: (state, action) => ({
      ...state,
      items: action.payload.items,
      cursor: action.payload.cursor,
      refreshing: false,
    }),

    [types.POSTS_REFRESH_FAILURE]: (state, action) => ({
      ...state,
      refreshing: false,
      error: action.error,
    }),
  },
  initialState
);
