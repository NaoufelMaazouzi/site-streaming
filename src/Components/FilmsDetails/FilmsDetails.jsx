import React, { useEffect, useState } from 'react';
import './FilmsDetails.css';


const FilmsDetails = ({ match }) => {
    const [films, setFilms] = useState([]);
    useEffect(() => {
        fetchFilms();
    }, [])



    const fetchFilms = async () => {
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=c0f2b3829e285f40ea8719b23184af1b&language=fr`
        );

        const fetchedFilms = await data.json();

        setFilms(fetchedFilms);
    }



    return (
        <div className="flexBox" >
            <div className="videoContainer">
                <div className="titreFilms"><h1 className="titre">{films.title}</h1></div>
                <img alt={""} src={`https://image.tmdb.org/t/p/original${films.backdrop_path}`} />
            </div>
            <div className="infosDiv">
                <p className="filmsOverview">{films.overview}</p>
                <p className="filmsOverview">Titre original: &nbsp;&nbsp;&nbsp;&nbsp; {films.original_title}</p>
                <p className="filmsOverview">Date de sortie: &nbsp;&nbsp;&nbsp;&nbsp; {films.release_date}</p>
            </div>
        </div>
    )
}


export default FilmsDetails;