import configureStore from './CreateStore';
import rootSaga from '../Sagas';
import rootReducer from '../Reducers';

export default () => {
  return configureStore(rootReducer, rootSaga);
};
