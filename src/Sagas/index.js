import { all } from 'redux-saga/effects';
import authSaga from './auth';
import plantsSaga from './plants';
import plantSaga from './plant';
import photoSaga from './photo';
import postsSaga from './posts';

export default function* rootSaga() {
  yield all([authSaga(), plantsSaga(), photoSaga(), plantSaga(), postsSaga()]);
}
