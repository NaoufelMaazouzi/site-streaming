import { FAVORITES_FILMS_IN_CACHE } from '../types';

export const favoritesFilmsInCache = ({films, filmsReduced, page}) => {
    return {
        type: FAVORITES_FILMS_IN_CACHE,
        payload: {films, filmsReduced, page}
    }
}

export const addFavoritesFilms = (film) => {
    return (dispatch, getState) => {
        let { page, filmsReduced } = getState().favoritesFilms.favoritesFilmsInCache;

        let favoritesFilms = JSON.parse(localStorage.getItem('favoritesFilms')) || [];
        const existingFilm = favoritesFilms.find(e => e.id === film.id);
        if (existingFilm) {
            favoritesFilms = favoritesFilms.filter(e => e.id !== film.id);
        } else {
            favoritesFilms.push(film);
        }
        filmsReduced = favoritesFilms.slice(( (page - 1) * 20), page * 20);
        localStorage.setItem('favoritesFilms', JSON.stringify(favoritesFilms));
        dispatch(favoritesFilmsInCache({films: favoritesFilms, filmsReduced, page: Number(page)}));
    }
}

export const getFavoritesFilms = ({pageNumber = 1}) => {
    const localStorageData = JSON.parse(localStorage.getItem('favoritesFilms')) || [];
    const filmsReduced = localStorageData.slice(( (pageNumber - 1) * 20), pageNumber * 20);

    return favoritesFilmsInCache({films: localStorageData, filmsReduced, page: Number(pageNumber)});
}