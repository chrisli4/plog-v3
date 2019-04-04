import { handleActions } from 'redux-actions';
import * as types from '../Constants/auth';

const initialState = {
  error: null,
  user: null,
};

export default handleActions(
  {
    [types.SYNC_USER]: (state, action) => ({
      ...state,
      user: action.payload.user,
    }),

    [types.LOGIN_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload.message,
    }),

    [types.SIGNUP_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload.message,
    }),

    [types.CLEAR_ERROR]: state => ({
      ...state,
      error: null,
    }),
  },
  initialState
);
