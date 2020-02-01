import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'


const CardFilm = ({ filmsSearch, titre }) => {

    console.log({ filmsSearch });


    return (
        <div className="flexBox" >
            {filmsSearch.map((search, index) => (
                <div className="cardFilm" key={index}>
                    <div className="playIcon">
                        <a href="#" className="icon" title="Regarder">
                            <FontAwesomeIcon icon={faPlayCircle} />
                        </a>
                        <p className="titres">{search.original_title}</p>
                    </div>
                    <img alt={""} src={`https://image.tmdb.org/t/p/original${search.poster_path}`} />
                </div>

            ))}
        </div>
    );

}


export default CardFilm;
