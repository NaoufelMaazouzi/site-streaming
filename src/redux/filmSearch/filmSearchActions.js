import { FETCH_FILMS_SEARCH_SUCCES, FETCH_FILMS_SEARCH_FAIL, FETCH_FILMS_SEARCH_REFRESH } from '../types';
import Axios from 'axios';

export const fetchFilmsSearchSuccess = (filmsFetched, search) => {
    return {
        type: FETCH_FILMS_SEARCH_SUCCES,
        payload: {filmsFetched, search}
    }
}

export const fetchFilmsSearchFail = (error) => {
    return {
        type: FETCH_FILMS_SEARCH_FAIL,
        payload: error
    }
}

export const fetchFilmsSearchRefresh = () => {
    return {
        type: FETCH_FILMS_SEARCH_REFRESH,
        payload: []
    }
}

export const fetchFilmsSearch = ({search, pageNumber}) => {
    return (dispatch, getStore) => {
        const searchFilm = search ? search : getStore().filmSearch?.search;
        Axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchFilm}&api_key=c0f2b3829e285f40ea8719b23184af1b&language=fr&page=${pageNumber}`)
            .then(response => {
                const filmsFetched = response.data;
                dispatch(fetchFilmsSearchSuccess(filmsFetched, searchFilm));
            })
            .catch(error => {
                const errorMsgFilmSearch = error.message;
                dispatch(fetchFilmsSearchFail(errorMsgFilmSearch));
            })
    }
}
