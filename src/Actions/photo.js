import { createAction } from 'redux-actions';
import * as types from '../Constants/photo';

export const pickPhoto = createAction(types.PHOTO_PICK_REQUEST, route => ({
  route,
}));

export const pickPhotoSuccess = createAction(
  types.PHOTO_PICK_SUCCESS,
  photo => ({ photo })
);

export const pickPhotoFailure = createAction(types.PHOTO_PICK_FAILURE);
