import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import Fire from '../Services/Firebase';
import {
  PLANTS_GET_REQUEST,
  PLANTS_ADD_REQUEST,
  PLANTS_REFRESH_REQUEST,
} from '../Constants/plants';
import {
  getPlantsSuccess,
  getPlantsFailure,
  addPlantSuccess,
  addPlantFailure,
  refreshPlantsSuccess,
  refreshPlantsFailure,
} from '../Actions/plants';
import NavigationService from '../Services/NavigationService';

function* getPlantsSaga(action) {
  try {
    const { start, uid } = action.payload;
    const list = yield select(state => state.plants.items);

    // If we're at the end of the list, return.
    if (start === null && list.length > 0) return;
    const { data, cursor } = yield call(
      [Fire.shared, Fire.shared.getPlants],
      start,
      uid
    );
    yield put(getPlantsSuccess(data, cursor));
  } catch (error) {
    yield put(getPlantsFailure(error));
  }
}

function* addPlantSaga(action) {
  try {
    const { plant, photo } = action.payload;
    const id = Fire.shared.generateKey();
    yield call([Fire.shared, Fire.shared.post], '/plants', id, plant, photo);
    yield put(addPlantSuccess(id));
    NavigationService.navigate('Home');
  } catch (error) {
    yield put(addPlantFailure(error));
  }
}

function* refreshPlantsSaga(action) {
  try {
    const { uid } = action.payload;
    const { data, cursor } = yield call(
      [Fire.shared, Fire.shared.getPlants],
      null,
      uid
    );
    yield put(refreshPlantsSuccess(data, cursor));
  } catch (error) {
    yield put(refreshPlantsFailure(error));
  }
}

export default function* plantsRoot() {
  yield all([
    takeLatest(PLANTS_GET_REQUEST, getPlantsSaga),
    takeLatest(PLANTS_ADD_REQUEST, addPlantSaga),
    takeLatest(PLANTS_REFRESH_REQUEST, refreshPlantsSaga),
  ]);
}
