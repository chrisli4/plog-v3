import { handleActions } from 'redux-actions';
import * as types from '../Constants/auth';

const initialState = {
  error: '',
  user: null,
};

export default handleActions(
  {
    [types.SYNC_USER]: (state, action) => ({
      ...state,
      user: action.payload.user,
    }),
  },
  initialState
);
