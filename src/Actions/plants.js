import { createAction } from 'redux-actions';
import * as types from '../Constants/plants';

export const addPlant = createAction(
  types.PLANTS_ADD_REQUEST,
  (plant, photo) => ({
    plant,
    photo,
  })
);

export const addPlantSuccess = createAction(types.PLANTS_ADD_SUCCESS, id => ({
  id,
}));

export const addPlantFailure = createAction(types.PLANTS_ADD_FAILURE);

export const getPlants = createAction(
  types.PLANTS_GET_REQUEST,
  (start, uid) => ({ start, uid })
);

export const getPlantsSuccess = createAction(
  types.PLANTS_GET_SUCCESS,
  (items, cursor) => ({
    items,
    cursor,
  })
);

export const getPlantsFailure = createAction(types.PLANTS_GET_FAILURE);

export const refreshPlants = createAction(
  types.PLANTS_REFRESH_REQUEST,
  uid => ({ uid })
);

export const refreshPlantsSuccess = createAction(
  types.PLANTS_REFRESH_SUCCESS,
  (items, cursor) => ({
    items,
    cursor,
  })
);

export const refreshPlantsFailure = createAction(types.PLANTS_REFRESH_FAILURE);
