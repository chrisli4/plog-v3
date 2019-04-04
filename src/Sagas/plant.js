import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import Fire from '../Services/Firebase';
import {
  PLANT_GET_INITIAL_POSTS_REQUEST,
  PLANT_GET_POSTS_REQUEST,
  PLANT_ADD_POST_REQUEST,
} from '../Constants/plant';
import {
  getInitialPostsSuccess,
  getInitialPostsFailure,
  getPostsSuccess,
  getPostsFailure,
  addPostSuccess,
  addPostFailure,
} from '../Actions/plant';
import NavigationService from '../Services/NavigationService';

function* getInitialPostsSaga(action) {
  const { pid } = action.payload;
  try {
    const { data, cursor } = yield call(
      [Fire.shared, Fire.shared.getPosts],
      null,
      pid
    );
    yield put(getInitialPostsSuccess(data, cursor));
  } catch (error) {
    yield put(getInitialPostsFailure(error));
  }
}

function* getPostsSaga(action) {
  const { start, pid } = action.payload;
  const list = yield select(state => state.plants.items);

  // If we're at the end of the list, return.
  console.log(start, list.length);
  if (!start && list.length > 0) return;
  try {
    const { data, cursor } = yield call(
      [Fire.shared, Fire.shared.getPosts],
      start,
      pid
    );
    yield put(getPostsSuccess(data, cursor));
  } catch (error) {
    yield put(getPostsFailure(error));
  }
}

function* addPostSaga(action) {
  const { post, photo } = action.payload;
  const id = Fire.shared.generateKey();
  try {
    yield call([Fire.shared, Fire.shared.post], '/posts', id, post, photo);
    yield put(addPostSuccess(id));
    NavigationService.navigate('Plant');
  } catch (error) {
    yield put(addPostFailure(error));
  }
}

export default function* plantRoot() {
  yield all([
    takeLatest(PLANT_GET_INITIAL_POSTS_REQUEST, getInitialPostsSaga),
    takeLatest(PLANT_GET_POSTS_REQUEST, getPostsSaga),
    takeLatest(PLANT_ADD_POST_REQUEST, addPostSaga),
  ]);
}
