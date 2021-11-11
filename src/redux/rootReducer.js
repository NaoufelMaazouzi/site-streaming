import { combineReducers } from 'redux';
import filmWithGenresReducers from './filmWithGenres/filmWithGenresReducers';
import filmSearchReducers from './filmSearch/filmSearchReducers';
import filmsDetailsReducers from './filmsDetails/filmsDetailsReducers';
import favoritesFilmsReducers from './favoritesFilms/favoritesFilmsReducers';

const rootReducer = combineReducers({
  filmsWithGenres: filmWithGenresReducers,
  filmSearch: filmSearchReducers,
  filmsDetails: filmsDetailsReducers,
  favoritesFilms: favoritesFilmsReducers,
});

export default rootReducer;
