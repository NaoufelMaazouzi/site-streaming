import React, { useEffect, useState } from 'react';
import './FilmsDetails.css';
import { connect } from 'react-redux';
import { fetchFilmsDetails } from '../../redux/filmsDetails/filmsDetailsActions';

const FilmsDetails = ({ fetchFilmsDetails, filmsDetails }) => {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        fetchFilmsDetails();
        setHidden(true);
        setTimeout(() => {
            setHidden(false);
        }, 300);
    }, [])

    return (
        <div className="flexBox" >
              {!hidden ?
              <>
              <div className="videoContainer">
                <h1 className="filmTitle">{filmsDetails?.filmsDetailsFetched?.title}</h1>
                {filmsDetails?.filmsDetailsFetched?.trailerKeyVideo ? 
                <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${filmsDetails.filmsDetailsFetched.trailerKeyVideo}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
              /> :
              filmsDetails?.filmsDetailsFetched?.backdrop_path ? <div>
                    <img alt={""} src={`https://image.tmdb.org/t/p/original${filmsDetails.filmsDetailsFetched.backdrop_path}`} />
                    <h2 className="titleImage">(Aucun trailer)</h2>
                </div> : <div><h2 className="titleImage">Aucuns trailer ou poster pour ce film</h2></div>
            }
            </div>
            <div className="infosDiv">
                <p className="filmsOverview">Synopsis: &nbsp;&nbsp;&nbsp;&nbsp;
                {filmsDetails?.filmsDetailsFetched?.overview || 'Aucun synopsis'}
                </p>
                <p className="filmsOverview">Titre original: &nbsp;&nbsp;&nbsp;&nbsp;
                {filmsDetails?.filmsDetailsFetched?.original_title || 'Aucun titre'}
                </p>
                <p className="filmsOverview">Date de sortie: &nbsp;&nbsp;&nbsp;&nbsp;
                {filmsDetails?.filmsDetailsFetched?.release_date || 'Aucune date'}
                </p>
            </div> 
            </>
            : ''}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filmsDetails: state.filmsDetails
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFilmsDetails: () => dispatch(fetchFilmsDetails(ownProps.match.params.id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(FilmsDetails);