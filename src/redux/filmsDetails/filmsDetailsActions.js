import { FETCH_FILMS_DETAILS_SUCCES, FETCH_FILMS_DETAILS_FAIL } from '../types';
import Axios from 'axios';

// Action when fetch detail succeed
export const fetchFilmsDetailsSuccess = (details) => {
    return {
        type: FETCH_FILMS_DETAILS_SUCCES,
        payload: details
    }
}

// Action when fetch detail fails
export const fetchFilmsDetailsFail = (error) => {
    return {
        type: FETCH_FILMS_DETAILS_FAIL,
        payload: error
    }
}

// Function to fetch all the details of film + the trailer link
export const fetchFilmsDetails = (id) => {
    return (dispatch) => {
        Promise.all([
            Axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=c0f2b3829e285f40ea8719b23184af1b&language=fr`),
            Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c0f2b3829e285f40ea8719b23184af1b&language=fr`)
        ])
            .then(([trailer, details]) => {
                const detailsFilmData = details.data;
                const trailerKeyVideo = trailer.data.results.find(e => e.type === 'Trailer');
                if (trailerKeyVideo) {
                    detailsFilmData.trailerKeyVideo = trailerKeyVideo.key
                }
                window.scrollTo(0, 0);
                dispatch(fetchFilmsDetailsSuccess(detailsFilmData));
            })
            .catch(error => {
                const errorMsgFilmDetails = error.message;
                dispatch(fetchFilmsDetailsFail(errorMsgFilmDetails));
            })
    }
}
