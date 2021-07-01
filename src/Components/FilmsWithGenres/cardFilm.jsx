import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addFavoritesFilms, getFavoritesFilms } from '../../redux/favoritesFilms/favoritesFilmsActions';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import './FilmsWithGenres.css';
import { connect } from 'react-redux';
import Pagination from '../Pagination/Pagination';

const CardFilm = ({
    id,
    data,
    favoritesFilms,
    addFavoritesFilms,
    getFavoritesFilms,
    titreSection,
    totalResults
}) => {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        getFavoritesFilms();
        setHidden(true);
        setTimeout(() => {
            setHidden(false);
        }, 200);
    }, [titreSection !== 'Favoris' ? data : null])

    return (
        <div>
            {!hidden ? 
            <div className="flexBox">
                    <div className="titreSection">
                        <h1 className="titre">{titreSection}</h1></div>
                        {data?.map((film, index) => (
                            <div className="cardFilm" key={index}>
                                <div className="playIcon">
                                    <Link to={`/${film.id}`} className="icon" title="Regarder">
                                        <FontAwesomeIcon icon={faPlayCircle} size='xs'/>
                                    </Link>
                                    <p className="titres">{film.title}</p>
                                    <div className="bottomFilm">
                                        <div className="note">
                                            <StarRateRoundedIcon />
                                            <p>{film.vote_average}</p>
                                        </div>
                                        <IconButton color="primary" aria-label="ajouter aux favoris" component="span">
                                        {favoritesFilms.map(e => e.id)?.includes(film.id) ?
                                            <FavoriteIcon onClick={() => addFavoritesFilms(film)} /> :
                                            <FavoriteBorderIcon onClick={() => addFavoritesFilms(film)} />
                                        }
                                        </IconButton>
                                    </div>
                                </div>
                                {film.poster_path ? 
                                <img alt={""} src={`https://image.tmdb.org/t/p/w342${film.poster_path}`}/> :
                                <img alt={""} src="/LogoCanal-.jpg"/>
                                }
                            </div>
                        ))}
                    </div> : ''}
            {!hidden && totalResults > 20 ? <Pagination id={id} /> : ''}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        favoritesFilms: state.favoritesFilms.favoritesFilmsInCache,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addFavoritesFilms: (film) => dispatch(addFavoritesFilms(film)),
        getFavoritesFilms: () => dispatch(getFavoritesFilms())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardFilm);