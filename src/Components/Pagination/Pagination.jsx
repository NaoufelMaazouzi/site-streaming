import React from 'react';
import './Pagination.css';

import { fetchFilmsWithGenres } from '../../redux/filmWithGenres/filmWithGenresActions';
import { connect, useDispatch } from 'react-redux';


const Pagination = ({ id, filmsData }) => {
    const pageLinks = []
    const dispatch = useDispatch();



    const filmsTotalPages = filmsData.totalPages && filmsData.totalPages;
    const filmsCurrentPage = filmsData.currentPage && filmsData.currentPage;

    for (let i = 1; i <= filmsTotalPages; i++) {
        let active = filmsCurrentPage === i ? 'active' : '';

        pageLinks.push(<li className={`paginationList ${active}`} key={i} onClick={() => dispatch(fetchFilmsWithGenres(id, i))}><a>{i}</a></li>)
    }


    return (
        <div className="paginationContainer">
            <ul className="paginationList">
                {filmsCurrentPage > 1 ? <li onClick={() => dispatch(fetchFilmsWithGenres(id, filmsCurrentPage - 1))}><a className={`paginationList`}>Prec</a></li> : ''}
                {filmsCurrentPage > 1 ? <li onClick={() => dispatch(fetchFilmsWithGenres(id, filmsTotalPages - filmsTotalPages + 1))}><a className={`paginationList`}> &#60;&#60; </a></li> : ''}
                {pageLinks[filmsCurrentPage - 3]}{pageLinks[filmsCurrentPage - 2]}{pageLinks[filmsCurrentPage - 1]}{pageLinks[filmsCurrentPage]}{pageLinks[filmsCurrentPage + 1]}
                {filmsCurrentPage > 1 && filmsCurrentPage !== filmsTotalPages ? <li onClick={() => dispatch(fetchFilmsWithGenres(id, filmsTotalPages))}><a className={`paginationList`}>>></a></li> : ''}
                {filmsCurrentPage < filmsTotalPages + 1 && filmsCurrentPage !== filmsTotalPages ? <li onClick={() => dispatch(fetchFilmsWithGenres(id, filmsCurrentPage + 1))}><a className={`paginationList`}>Suivant</a></li> : ''}
            </ul>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        filmsData: state.filmsWithGenres,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFilmsWithGenres: (id, page) => dispatch(fetchFilmsWithGenres(id, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);