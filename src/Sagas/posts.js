import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import Fire from '../Services/Firebase';
import { POSTS_GET_REQUEST, POSTS_REFRESH_REQUEST } from '../Constants/posts';
import {
  getPostsSuccess,
  getPostsFailure,
  refreshPostsSuccess,
  refreshPostsFailure,
} from '../Actions/posts';

function* getPostsSaga(action) {
  try {
    const { start } = action.payload;

    const list = yield select(state => state.posts.items);

    // If we're at the end of the list, return.
    if (!start && list.length > 0) return;

    const { data, cursor } = yield call(
      [Fire.shared, Fire.shared.getPosts],
      start,
      null
    );
    yield put(getPostsSuccess(data, cursor));
  } catch (error) {
    console.log(error);
    yield put(getPostsFailure(error));
  }
}

function* refreshPostsSaga() {
  try {
    const { data, cursor } = yield call(
      [Fire.shared, Fire.shared.getPosts],
      null
    );
    yield put(refreshPostsSuccess(data, cursor));
  } catch (error) {
    yield put(refreshPostsFailure(error));
  }
}

export default function* postsRoot() {
  yield all([
    takeLatest(POSTS_GET_REQUEST, getPostsSaga),
    takeLatest(POSTS_REFRESH_REQUEST, refreshPostsSaga),
  ]);
}
