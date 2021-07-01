import React, { useEffect } from 'react';
import './FilmsWithGenres.css';
import { fetchFilmsWithGenres } from '../../redux/filmWithGenres/filmWithGenresActions';
import { connect } from 'react-redux';
import { getFavoritesFilms } from '../../redux/favoritesFilms/favoritesFilmsActions';
import CardFilm from './cardFilm';


const FilmsWithGenres =  ({
    id,
    titreSection,
    getFavoritesFilms,
    filmsData,
    fetchFilmsWithGenres,
    filmSearch,
    favoritesFilms
}) => {
    let cardFilm = <CardFilm titreSection={titreSection} />;

    useEffect(() => {
        if (titreSection !== 'Favoris') {
            fetchFilmsWithGenres(id, 1);
        }
        getFavoritesFilms();
    }, [])


    if (titreSection !== 'Favoris' && filmSearch?.searchFilmsFetched?.results?.length) {
        cardFilm = <CardFilm
        data={filmSearch?.searchFilmsFetched?.results}
        titreSection={titreSection}
        totalResults={filmSearch?.searchFilmsFetched?.total_results}
        id={id}
        />
    } else if (titreSection !== 'Favoris') {
        cardFilm = <CardFilm
        data={filmsData?.filmsFetched?.results}
        titreSection={titreSection}
        totalResults={filmsData?.totalResults}
        id={id}
        />
    } else {
        cardFilm = <CardFilm
        data={favoritesFilms}
        titreSection={titreSection}
        totalResults={favoritesFilms?.length}
        id={id}
        />
    }

    return (
        <div>
            {cardFilm}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        filmsData: state.filmsWithGenres,
        filmSearch: state.filmSearch,
        favoritesFilms: state.favoritesFilms.favoritesFilmsInCache,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFilmsWithGenres: (id, page) => dispatch(fetchFilmsWithGenres(id, page)),
        getFavoritesFilms: () => dispatch(getFavoritesFilms())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilmsWithGenres);
