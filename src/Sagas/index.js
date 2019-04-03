import { all } from 'redux-saga/effects';
import authSaga from './auth';
import plantsSaga from './plants';

export default function* rootSaga() {
  yield all([authSaga(), plantsSaga()]);
}
