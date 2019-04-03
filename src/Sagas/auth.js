import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Fire from '../Services/Firebase';
import NavigationService from '../Services/NavigationService';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
} from '../Constants/auth';
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  signUpSuccess,
  signUpFailure,
  syncUser,
} from '../Actions/auth';

function* loginSaga(action) {
  try {
    const { username, password } = action.payload;
    const { auth } = Fire.shared;
    yield call([auth, auth.signInWithEmailAndPassword], username, password);
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* signUpSaga(action) {
  try {
    const { username, password } = action.payload;
    const { auth } = Fire.shared;
    yield call([auth, auth.createUserWithEmailAndPassword], username, password);
    yield put(signUpSuccess());
    yield call(NavigationService.navigate, 'Auth');
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* logoutSaga() {
  try {
    const { auth } = Fire.shared;
    yield call([auth, auth.signOut]);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function authChannel() {
  return eventChannel(emit => {
    const unsubscribe = Fire.shared.auth.onAuthStateChanged(
      user => emit({ user }),
      error => emit({ error })
    );
    return unsubscribe;
  });
}

function* syncUserSaga() {
  const channel = yield call(authChannel);

  while (true) {
    const { user } = yield take(channel);
    if (user) {
      yield put(syncUser(user));
      yield call(NavigationService.navigate, 'Tab');
    } else {
      yield put(syncUser(null));
      yield call(NavigationService.navigate, 'Auth');
    }
  }
}

export default function* authRoot() {
  yield all([
    fork(syncUserSaga),
    takeEvery(LOGIN_REQUEST, loginSaga),
    takeEvery(LOGOUT_REQUEST, logoutSaga),
    takeEvery(SIGNUP_REQUEST, signUpSaga),
  ]);
}
