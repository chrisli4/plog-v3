import { createAction } from 'redux-actions';
import * as types from '../Constants/plant';

export const getPlant = createAction(types.PLANT_GET_REQUEST, id => ({ id }));

export const getPlantSuccess = createAction(types.PLANT_GET_SUCCESS, plant => ({
  plant,
}));

export const getPlantFailure = createAction(types.PLANT_GET_FAILURE, error => ({
  error,
}));

export const getInitialPosts = createAction(
  types.PLANT_GET_INITIAL_POSTS_REQUEST,
  pid => ({ pid })
);

export const getInitialPostsSuccess = createAction(
  types.PLANT_GET_INITIAL_POSTS_SUCCESS,
  (items, cursor) => ({ items, cursor })
);

export const getInitialPostsFailure = createAction(
  types.PLANT_GET_INITIAL_POSTS_FAILURE,
  error => ({ error })
);

export const getPosts = createAction(
  types.PLANT_GET_POSTS_REQUEST,
  (start, pid) => ({
    start,
    pid,
  })
);

export const getPostsSuccess = createAction(
  types.PLANT_GET_POSTS_SUCCESS,
  (items, cursor) => ({
    items,
    cursor,
  })
);

export const getPostsFailure = createAction(
  types.PLANT_GET_POSTS_FAILURE,
  error => ({
    error,
  })
);

export const addPost = createAction(types.PLANT_ADD_POST_REQUEST, (post, photo) => ({
  post,
  photo,
}));

export const addPostSuccess = createAction(types.PLANT_ADD_POST_SUCCESS, id => ({ id }));

export const addPostFailure = createAction(types.PLANT_ADD_POST_FAILURE, error => ({ error }));
