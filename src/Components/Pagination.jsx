import React from 'react';
import '../App.css';

const Pagination = ({ pages, nextPage, currentPage }) => {
    const pageLinks = []

    for (let i = 1; i <= pages; i++) {
        let active = currentPage === i ? 'active' : '';

        pageLinks.push(<li className={`paginationList ${active}`} key={i} onClick={() => nextPage(i)}><a href="#">{i}</a></li>)
    }

    return (
        <div className="paginationContainer">
            <ul className="paginationList">
                {currentPage > 1 ? <li onClick={() => nextPage(currentPage - 1)}><a href="#" className={`paginationList`}>Prec</a></li> : ''}
                {currentPage > 1 ? <li onClick={() => nextPage(pages - pages + 1)}><a href="#" className={`paginationList`}> &#60;&#60; </a></li> : ''}
                {pageLinks[currentPage - 3]}{pageLinks[currentPage - 2]}{pageLinks[currentPage - 1]}{pageLinks[currentPage]}{pageLinks[currentPage + 1]}
                {currentPage > 1 && currentPage != pages ? <li onClick={() => nextPage(pages)}><a href="#" className={`paginationList`}>>></a></li> : ''}
                {currentPage < pages + 1 && currentPage != pages ? <li onClick={() => nextPage(currentPage + 1)}><a href="#" className={`paginationList`}>Suivant</a></li> : ''}
            </ul>
        </div>
    )
}


export default Pagination;