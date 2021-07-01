import { FAVORITES_FILMS_IN_CACHE } from '../types';


const initialeState = () => {
    return {
        favoritesFilmsInCache: [],
        error: '',
    }
}

const favoritesFilmsReducers = (state = initialeState, action) => {
    switch (action.type) {
        case FAVORITES_FILMS_IN_CACHE:
            return {
                favoritesFilmsInCache: action.payload,
                error: '',
            }
        default:
            return state
    }
}

export default favoritesFilmsReducers;