import React, { useState, useEffect } from 'react';
import './FilmsWithGenres.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';


const FilmsWithGenres = ({ id, filmsSearch, titreSection }) => {
    const [filmsMap, setFilmsMap] = useState([]);
    const [totalReuslts, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalePages] = useState(0);
    const numberPages = totalPages;

    useEffect(() => {
        fetchFilms();
    }, [])

    /***************************************************** FETCH BASICS FILMS *****************************************************/
    const fetchFilms = async (pageNumber) => {
        const data = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=c0f2b3829e285f40ea8719b23184af1b&language=fr&with_genres=${id}&page=${pageNumber}`
        );

        const fetchedFilms = await data.json();

        if (filmsSearch.length === 0) {
            setFilmsMap(fetchedFilms.results);
            setTotalResults(fetchedFilms.total_results);
            setTotalePages(fetchedFilms.total_pages);

        } else {
            setFilmsMap(filmsSearch);
            setTotalResults(filmsSearch.total_results);
            setTotalePages(filmsSearch.total_pages);
            console.log(filmsSearch);
        }
    }


    /***************************************************** FETCH SEARCH FILMS *****************************************************/
    const nextPage = async (pageNumber) => {
        const data = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=c0f2b3829e285f40ea8719b23184af1b&language=fr&with_genres=${id}&page=${pageNumber}`
        );

        const fetchedFilms = await data.json();
        if (fetchedFilms.results != 0) {
            setFilmsMap(fetchedFilms.results);
        }
        setCurrentPage(pageNumber);
        setTotalePages(fetchedFilms.total_pages);
        console.log(fetchedFilms);
    }


    return (
        <div>
            <div className="flexBox" >
                <div className="titreSection"><h1 className="titre">{titreSection}</h1></div>
                {filmsMap.map((search, index) => (
                    <div className="cardFilm" key={index}>
                        <div className="playIcon">
                            <Link to={`/${search.id}`} className="icon" title="Regarder">
                                <FontAwesomeIcon icon={faPlayCircle} />
                            </Link>
                            <p className="titres">{search.title}</p>
                        </div>
                        <img alt={""} src={`https://image.tmdb.org/t/p/original${search.poster_path}`} />
                    </div>
                ))
                }
            </div >
            {totalReuslts > 20 ? <Pagination pages={numberPages} nextPage={nextPage}
                currentPage={currentPage} /> : ''}
        </div>

    );

}


export default FilmsWithGenres;
