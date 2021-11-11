import React from 'react';
import './Pagination.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Pagination = ({
  filmsData,
  filmSearch,
  favorites,
}) => {
  const pageLinks = [];
  const history = useHistory();

  const filmsTotalPages = filmSearch?.searchFilmsFetched?.total_pages
    || Math.ceil(favorites?.films?.length / 20)
    || filmsData?.totalPages;

  const filmsCurrentPage = filmSearch?.searchFilmsFetched?.page
    || favorites?.page
    || filmsData?.currentPage;

  // Function to push a new url when clicking on pagination's links
  const handleClick = (pageNumber) => {
    history.push(`?${filmSearch.search ? `search=${filmSearch.search}&` : ''}page=${pageNumber}`);
  };

  // Loop throught films to add links for pagination
  for (let i = 1; i <= filmsTotalPages; i++) {
    const active = filmsCurrentPage === i ? 'active' : '';
    pageLinks.push(
      <li key={i} onClick={() => handleClick(i)}>
        <button type="button" className={`paginationList ${active}`}>{i}</button>
      </li>,
    );
  }

  return (
    <div className="paginationContainer">
      <ul className="paginationList">
        {filmsCurrentPage > 1
          ? (
            <li onClick={() => handleClick(filmsCurrentPage - 1)}>
              <button type="button" className="paginationList">Prec</button>
            </li>
          ) : ''}
        {filmsCurrentPage > 1
          ? (
            <li onClick={() => handleClick(filmsTotalPages - filmsTotalPages + 1)}>
              <button type="button" className="paginationList"> &#60;&#60; </button>
            </li>
          ) : ''}
        {pageLinks[filmsCurrentPage - 3]}
        {pageLinks[filmsCurrentPage - 2]}
        {pageLinks[filmsCurrentPage - 1]}
        {pageLinks[filmsCurrentPage]}
        {pageLinks[filmsCurrentPage + 1]}
        {filmsCurrentPage > 1 && filmsCurrentPage !== filmsTotalPages
          ? (
            <li onClick={() => handleClick(filmsTotalPages)}>
              <button type="button" className="paginationList"> &#62;&#62; </button>
            </li>
          ) : ''}
        {filmsCurrentPage < filmsTotalPages + 1 && filmsCurrentPage !== filmsTotalPages
          ? (
            <li onClick={() => handleClick(filmsCurrentPage + 1)}>
              <button type="button" className="paginationList">Suivant</button>
            </li>
          ) : ''}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filmsData: state.filmsWithGenres,
  filmSearch: state.filmSearch,
});

export default connect(mapStateToProps)(Pagination);
