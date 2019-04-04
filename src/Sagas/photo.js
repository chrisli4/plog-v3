import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ImagePicker, Permissions } from 'expo';
import NavigationService from '../Services/NavigationService';
import getPermission from '../Utils/getPermission';
import { PHOTO_PICK_REQUEST } from '../Constants/photo';
import { pickPhotoSuccess, pickPhotoFailure } from '../Actions/photo';

function* pickPhotoSaga(action) {
  try {
    const status = yield call(getPermission, Permissions.CAMERA_ROLL);
    if (status) {
      const result = yield call([
        ImagePicker,
        ImagePicker.launchImageLibraryAsync,
      ]);

      if (!result.cancelled) {
        yield put(pickPhotoSuccess(result));
        NavigationService.navigate(action.payload.route);
      }
    }
  } catch (error) {
    yield put(pickPhotoFailure(error));
  }
}

export default function* photoRoot() {
  yield all([takeLatest(PHOTO_PICK_REQUEST, pickPhotoSaga)]);
}
