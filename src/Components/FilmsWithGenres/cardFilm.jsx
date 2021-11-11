import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import './FilmsWithGenres.css';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { useSnackbar } from 'notistack';
import Pagination from '../Pagination/Pagination';
import { addFavoritesFilms, getFavoritesFilms } from '../../redux/favoritesFilms/favoritesFilmsActions';

const CardFilm = ({
  id,
  data,
  favoritesFilms,
  addFavoritesFilms,
  getFavoritesFilms,
  titreSection,
  totalResults,
  reload,
}) => {
  const [loading, setLoading] = useState(true);
  const canReload = reload ? data : null;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getFavoritesFilms({});
    // set hidden to true on mount & after 3sec set it to false so the images can load properly
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [canReload]);

  // Function triggered when adding or deleting favorites
  const handleFav = (film, variant) => {
    let message;
    if (variant === 'success') {
      message = 'Film ajouté aux favoris !';
    } else {
      message = 'Film supprimé des favoris !';
    }
    enqueueSnackbar(message, { variant });
    return addFavoritesFilms(film);
  };

  return (
    <div>
      <div className="flexBox">
        <div className="titreSection">
          <h1 className="titre">{titreSection}</h1>

        </div>
        {!loading && totalResults ? data?.map((film, index) => (
          <div className="cardFilm" key={index}>
            {film.poster_path
              ? <img alt="poster film" src={`https://image.tmdb.org/t/p/w342${film.poster_path}`} />
              : <img alt="poster Canal-" src="/LogoCanal-.jpg" />}
            <div className="playIcon">
              <Link to={`/details/${film.id}`} className="icon" title="Regarder">
                <FontAwesomeIcon icon={faPlayCircle} size="xs" />
              </Link>
              <p className="titres">{film.title}</p>
              <div className="bottomFilm">
                <div className="note">
                  <StarRateRoundedIcon />
                  <p>{film.vote_average}</p>
                </div>
                <IconButton style={{ color: red[500] }} aria-label="ajouter aux favoris" component="span">
                  {favoritesFilms.films.map((e) => e.id)?.includes(film.id)
                    ? <FavoriteIcon onClick={() => handleFav(film, 'error')} />
                    : <FavoriteBorderIcon onClick={() => handleFav(film, 'success')} />}
                </IconButton>
              </div>
            </div>
          </div>
        ))
          : (!loading && titreSection === 'FAVORIS'
                        && (
                        <div className="noResults">
                          <h2 className="titleNoResults">Vous n'avez pas de films dans vos favoris !</h2>
                        </div>
                        ))
                        || (
                        <div className="waitingDiv">
                          <CircularProgress size={80} />
                        </div>
                        )}
      </div>
      {!loading && totalResults ? <Pagination id={id} favorites={titreSection === 'FAVORIS' ? favoritesFilms : false} /> : ''}
    </div>
  );
};

const mapStateToProps = (state) => ({
  favoritesFilms: state.favoritesFilms.favoritesFilmsInCache,
});

const mapDispatchToProps = (dispatch) => ({
  addFavoritesFilms: (film) => dispatch(addFavoritesFilms(film)),
  getFavoritesFilms: ({ pageNumber }) => dispatch(getFavoritesFilms({ pageNumber })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardFilm);
