import React, { useEffect, useState } from 'react';
import './FilmsDetails.css';

import { connect } from 'react-redux';
import { fetchFilmsDetails } from '../../redux/filmsDetails/filmsDetailsActions';


const FilmsDetails = ({ match, fetchFilmsDetails, filmsDetails }) => {

    useEffect(() => {
        fetchFilmsDetails();
    }, [])

    return (
        <div className="flexBox" >
            <div className="videoContainer">
                <div className="titreFilms"><h1 className="titre">{filmsDetails.filmsDetailsFetched && filmsDetails.filmsDetailsFetched.title}</h1></div>
                <img alt={""} src={`https://image.tmdb.org/t/p/original${filmsDetails.filmsDetailsFetched && filmsDetails.filmsDetailsFetched.backdrop_path}`} />
            </div>
            <div className="infosDiv">
                <p className="filmsOverview">{filmsDetails.filmsDetailsFetched && filmsDetails.filmsDetailsFetched.overview}</p>
                <p className="filmsOverview">Titre original: &nbsp;&nbsp;&nbsp;&nbsp; {filmsDetails.filmsDetailsFetched && filmsDetails.filmsDetailsFetched.original_title}</p>
                <p className="filmsOverview">Date de sortie: &nbsp;&nbsp;&nbsp;&nbsp; {filmsDetails.filmsDetailsFetched && filmsDetails.filmsDetailsFetched.release_date}</p>
            </div>
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