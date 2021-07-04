import React from 'react';
import './Pagination.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Pagination = ({
    id,
    filmsData,
    filmSearch,
    favorites,
}) => {
    const pageLinks = [];
    const history = useHistory();

    const filmsTotalPages = filmSearch?.searchFilmsFetched?.total_pages ||
    Math.ceil(favorites?.films?.length / 20) ||
    filmsData?.totalPages;

    const filmsCurrentPage = filmSearch?.searchFilmsFetched?.page ||
    favorites?.page ||
    filmsData?.currentPage;

    for (let i = 1; i <= filmsTotalPages; i++) {
        let active = filmsCurrentPage === i ? 'active' : '';
        pageLinks.push(
            <li key={i} onClick={() => handleClick(id, i)}>
                <button type="button" className={`paginationList ${active}`}>{i}</button>
            </li>
        )
    }

    const handleClick = (id, pageNumber) => {
        history.push(`?${filmSearch.search ? `search=${filmSearch.search}&` : ''}page=${pageNumber}`)
    }

    return (
        <div className="paginationContainer">
            <ul className="paginationList">
                {filmsCurrentPage > 1 ?
                <li onClick={() => handleClick(id, filmsCurrentPage - 1)}>
                    <button type="button" className={`paginationList`}>Prec</button>
                </li> : ''}
                {filmsCurrentPage > 1 ?
                <li onClick={() => handleClick(id, filmsTotalPages - filmsTotalPages + 1)}>
                    <button type="button" className={`paginationList`}> &#60;&#60; </button>
                </li> : ''}
                {pageLinks[filmsCurrentPage - 3]}
                {pageLinks[filmsCurrentPage - 2]}
                {pageLinks[filmsCurrentPage - 1]}
                {pageLinks[filmsCurrentPage]}
                {pageLinks[filmsCurrentPage + 1]}
                {filmsCurrentPage > 1 && filmsCurrentPage !== filmsTotalPages ?
                <li onClick={() => handleClick(id, filmsTotalPages)}>
                    <button type="button" className={`paginationList`}> &#62;&#62; </button>
                </li> : ''}
                {filmsCurrentPage < filmsTotalPages + 1 && filmsCurrentPage !== filmsTotalPages ?
                <li onClick={() => handleClick(id, filmsCurrentPage + 1)}>
                    <button type="button" className={`paginationList`}>Suivant</button>
                </li> : ''}
            </ul>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        filmsData: state.filmsWithGenres,
        filmSearch: state.filmSearch
    }
}

export default connect(mapStateToProps)(Pagination);