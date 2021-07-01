import { FAVORITES_FILMS_IN_CACHE } from '../types';

export const favoritesFilmsInCache = (films) => {
    return {
        type: FAVORITES_FILMS_IN_CACHE,
        payload: films
    }
}

export const addFavoritesFilms = (film) => {
        let favoritesFilms = JSON.parse(localStorage.getItem('favoritesFilms')) || [];
        const existingFilm = favoritesFilms.find(e => e.id === film.id);
        if (existingFilm) {
            favoritesFilms = favoritesFilms.filter(e => e.id !== film.id);
        } else {
            favoritesFilms.push(film);
        }
        localStorage.setItem('favoritesFilms', JSON.stringify(favoritesFilms));
        return favoritesFilmsInCache(favoritesFilms);
}

export const getFavoritesFilms = () => {
    let favoritesFilms = JSON.parse(localStorage.getItem('favoritesFilms')) || [];
    return favoritesFilmsInCache(favoritesFilms);
}