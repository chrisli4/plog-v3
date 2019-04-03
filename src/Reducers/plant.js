import { handleActions } from 'redux-actions';
import * as types from '../Constants/plant';

const initialState = {
  id: '',
  name: '',
  species: '',
  genus: '',
  author: {},
  timestamp: '',
  image: '',
  posts: [],
  cursor: null,
};

export default handleActions(
  {
    [types.PLANT_GET_SUCCESS]: (state, action) => ({
      ...state,
      id: action.payload.plant.id,
      name: action.payload.plant.name,
      species: action.payload.plant.species,
      genus: action.payload.plant.genus,
      author: action.payload.plant.author,
      timestamp: action.payload.plant.timestamp,
      image: action.payload.plant.image,
    }),

    [types.PLANT_GET_POSTS_SUCCESS]: (state, action) => ({
      ...state,
      posts: [...state.posts, ...action.payload.items],
      cursor: action.payload.cursor,
    }),

    [types.PLANT_CLEAR_ALL_POSTS]: state => ({
      ...state,
      posts: [],
    }),
  },
  initialState
);
