import { FETCH_FILMS_DETAILS_SUCCES, FETCH_FILMS_DETAILS_FAIL } from '../types';

const initialeState = () => ({
  filmsDetailsFetched: [],
  error: '',
});

// Films details reducers
const filmsDetailsReducers = (action, state = initialeState) => {
    if (action) {
        switch (action.type) {
            case FETCH_FILMS_DETAILS_SUCCES:
            return {
                filmsDetailsFetched: action.payload,
                error: '',
            };
            case FETCH_FILMS_DETAILS_FAIL:
            return {
                filmsDetailsFetched: [],
                error: action.payload,
            };
            default:
            return state;
        }
    }
    return state;
};

export default filmsDetailsReducers;
