import { FETCH_FILMS_GENRES_SUCCES, FETCH_FILMS_GENRES_FAIL } from '../types';


const initialeState = () => {
    return {
        filmsFetched: [],
        error: '',
        totalResults: 0,
        totalPages: 0,
        currentPage: 1
    }
}

const filmWithGenresReducers = (state = initialeState, action) => {
    switch (action.type) {
        case FETCH_FILMS_GENRES_SUCCES:
            return {
                filmsFetched: action.payload,
                error: '',
                totalResults: action.payload.total_results,
                totalPages: action.payload.total_pages,
                currentPage: action.payload.page
            }
        case FETCH_FILMS_GENRES_FAIL:
            return {
                filmsFetched: [],
                error: action.payload,
                totalResults: 0,
                totalPages: 0,
                currentPage: 1
            }
        default:
            return state
    }
}

export default filmWithGenresReducers;