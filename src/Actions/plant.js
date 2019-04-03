import { createAction } from 'redux-actions';
import * as types from '../Constants/plant';

export const getPlant = createAction(types.PLANT_GET_REQUEST, id => ({ id }));

export const getPlantSuccess = createAction(types.PLANT_GET_SUCCESS, plant => ({
  plant,
}));

export const getPlantFailure = createAction(types.PLANT_GET_FAILURE, error => ({ error }));
