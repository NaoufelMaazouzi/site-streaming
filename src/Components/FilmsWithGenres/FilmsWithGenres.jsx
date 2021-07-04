import React, { useEffect } from 'react';
import './FilmsWithGenres.css';
import { connect } from 'react-redux';
import { getFavoritesFilms } from '../../redux/favoritesFilms/favoritesFilmsActions';
import { fetchFilmsSearch } from '../../redux/filmSearch/filmSearchActions';
import { fetchFilmsWithGenres } from '../../redux/filmWithGenres/filmWithGenresActions';
import CardFilm from './cardFilm';
import { useLocation } from 'react-router';
import queryString from 'query-string';

const FilmsWithGenres =  ({
    id,
    titreSection,
    getFavoritesFilms,
    filmsData,
    fetchFilmsWithGenres,
    filmSearch,
    favoritesFilms,
    fetchFilmsSearch
}) => {
    let cardFilm = <CardFilm titreSection={titreSection} />;
    const {search, page} = queryString.parse(useLocation().search);

    useEffect(() => {
        if (titreSection !== 'FAVORIS') {
            fetchFilmsWithGenres(id, page);
        }
        if (search) {
            fetchFilmsSearch({search, pageNumber: page});
        }
        getFavoritesFilms({pageNumber: page});
    }, [])

    if (filmSearch?.searchFilmsFetched?.results?.length) {
        cardFilm = <CardFilm
        data={filmSearch?.searchFilmsFetched?.results}
        titreSection={'Tous les films correspondants à votre recherche'}
        totalResults={filmSearch?.searchFilmsFetched?.total_results}
        id={id}
        reload={true}
        />
    } else if (titreSection !== 'FAVORIS') {
        cardFilm = <CardFilm
        data={filmsData?.filmsFetched?.results}
        titreSection={titreSection}
        totalResults={filmsData?.totalResults}
        id={id}
        reload={true}
        />
    } else {
        cardFilm = <CardFilm
        data={favoritesFilms?.filmsReduced?.slice(0, 20)}
        titreSection={titreSection}
        totalResults={favoritesFilms?.filmsReduced?.length}
        id={id}
        reload={false}
        />
    }

    return (
        <div>
            {cardFilm}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        filmsData: state.filmsWithGenres,
        filmSearch: state.filmSearch,
        favoritesFilms: state.favoritesFilms.favoritesFilmsInCache,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFilmsWithGenres: (id, page) => dispatch(fetchFilmsWithGenres(id, page)),
        getFavoritesFilms: ({pageNumber}) => dispatch(getFavoritesFilms({pageNumber})),
        fetchFilmsSearch: ({search, pageNumber}) => dispatch(fetchFilmsSearch({search, pageNumber})),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilmsWithGenres);
