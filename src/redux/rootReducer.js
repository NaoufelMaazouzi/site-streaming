import { combineReducers } from 'redux';
import filmWithGenresReducers from './filmWithGenres/filmWithGenresReducers';
import filmSearchReducers from './filmSearch/filmSearchReducers';
import filmsDetailsReducers from './filmsDetails/filmsDetailsReducers';

const rootReducer = combineReducers({
    filmsWithGenres: filmWithGenresReducers,
    filmSearch: filmSearchReducers,
    filmsDetails: filmsDetailsReducers
})

export default rootReducer;