import { createAction } from 'redux-actions';
import * as types from '../Constants/posts';

export const getPosts = createAction(types.POSTS_GET_REQUEST, start => ({
  start,
}));

export const getPostsSuccess = createAction(
  types.POSTS_GET_SUCCESS,
  (items, cursor) => ({
    items,
    cursor,
  })
);

export const getPostsFailure = createAction(types.POSTS_GET_FAILURE);
