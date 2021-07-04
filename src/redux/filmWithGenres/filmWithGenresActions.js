import { FETCH_FILMS_GENRES_SUCCES, FETCH_FILMS_GENRES_FAIL, FETCH_FILMS_REFRESH } from '../types';
import Axios from 'axios';

// Action when films with genres succeed
export const fetchFilmsSuccess = (films) => {
    return {
        type: FETCH_FILMS_GENRES_SUCCES,
        payload: films
    }
}

// Action when films with genres fails
const fetchFilmsFail = (error) => {
    return {
        type: FETCH_FILMS_GENRES_FAIL,
        payload: error
    }
}

// Action when we refresh the films with genres
export const fetchFilmsRefresh = () => {
    return {
        type: FETCH_FILMS_REFRESH,
        payload: []
    }
}

// Function to fetch films with genres
export const fetchFilmsWithGenres = (id, pageNumber) => {
    return (dispatch) => {
        Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=c0f2b3829e285f40ea8719b23184af1b&language=fr&with_genres=${id}&page=${pageNumber}`)
            .then(response => {
                const films = response.data;
                window.scrollTo(0, 0);
                dispatch(fetchFilmsSuccess(films));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchFilmsFail(errorMsg));
            })
    }
}


