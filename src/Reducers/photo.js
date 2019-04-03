import { handleActions } from 'redux-actions';
import * as types from '../Constants/photo';

const initialState = {
  photo: '',
  error: null,
};

export default handleActions(
  {
    [types.PHOTO_PICK_SUCCESS]: (state, action) => ({
      ...state,
      photo: action.payload.photo,
      error: null,
    }),
    [types.PHOTO_PICK_FAILURE]: (state, action) => ({
      ...state,
      photo: '',
      error: action.error,
    }),
  },
  initialState
);
