import { FAVORITES_FILMS_IN_CACHE } from '../types';

const initialeState = () => ({
  favoritesFilmsInCache: [],
  error: ''
});

// Reducer for the favorites films in cache
const favoritesFilmsReducers = (action, state = initialeState) => {
  switch (action && action.type) {
    case FAVORITES_FILMS_IN_CACHE:
      return {
        favoritesFilmsInCache: action.payload,
        error: '',
      };
    default:
      return state;
  }
};

export default favoritesFilmsReducers;
