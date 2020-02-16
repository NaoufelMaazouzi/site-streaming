import React, { useState, useEffect } from 'react';
import './FilmsWithGenres.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

import { fetchFilmsWithGenres } from '../../redux/filmWithGenres/filmWithGenresActions';
import { connect } from 'react-redux';


const FilmsWithGenres = ({ id, titreSection, filmsData, fetchFilmsWithGenres, filmSearch }) => {

    const filmsTotalResults = filmsData.totalResults && filmsData.totalResults;

    useEffect(() => {
        fetchFilmsWithGenres(id, 1);
    }, [])

    return (
        <div>
            <div className="flexBox" >
                <div className="titreSection"><h1 className="titre">{titreSection}</h1></div>
                {filmSearch.searchFilmsFetched && filmSearch.searchFilmsFetched.results && filmSearch.searchFilmsFetched.results.length > 0 ? filmSearch.searchFilmsFetched.results.map((search, index) => (
                    <div className="cardFilm" key={index}>
                        <div className="playIcon">
                            <Link to={`/${search.id}`} className="icon" title="Regarder">
                                <FontAwesomeIcon icon={faPlayCircle} />
                            </Link>
                            <p className="titres">{search.title}</p>
                        </div>
                        <img alt={""} src={`https://image.tmdb.org/t/p/original${search.poster_path}`} />
                    </div>
                )) : filmsData.filmsFetched && filmsData.filmsFetched.results.map((search, index) => (
                    <div className="cardFilm" key={index}>
                        <div className="playIcon">
                            <Link to={`/${search.id}`} className="icon" title="Regarder">
                                <FontAwesomeIcon icon={faPlayCircle} />
                            </Link>
                            <p className="titres">{search.title}</p>
                        </div>
                        <img alt={""} src={`https://image.tmdb.org/t/p/original${search.poster_path}`} />
                    </div>
                ))}
            </div >
            {filmsTotalResults > 20 ? <Pagination id={id} /> : ''}
        </div>

    );

}

const mapStateToProps = (state) => {
    return {
        filmsData: state.filmsWithGenres,
        filmSearch: state.filmSearch
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFilmsWithGenres: (id, page) => dispatch(fetchFilmsWithGenres(id, page))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilmsWithGenres);
