import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './SideDrawer.css';
import { connect } from 'react-redux';
import { fetchFilmsSearch, fetchFilmsSearchRefresh } from '../../redux/filmSearch/filmSearchActions';

const SideDrawer = ({ closeSide, show, fetchFilmsSearchRefresh }) => {
    let drawerClasses = 'side-drawer';
    const history = useHistory();

    if (show) {
        drawerClasses = 'side-drawer open';
    }

    const handleClick = () => {
        fetchFilmsSearchRefresh();
        closeSide();
    }

    const _onSubmit = (e) => {
        e.preventDefault();
        history.push(`/?search=${e.target.elements.nomFilm.value}&page=1`);
        e.target.elements.nomFilm.value = '';
        closeSide();
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                <form onSubmit={_onSubmit} >
                    <input className="sideSearchInput" type="text" placeholder="Rechercher..." name="nomFilm"></input>
                </form>
                <Link to="/" exact onClick={handleClick} >
                    <li>Accueil</li>
                </Link>
                <Link to="/actions" onClick={handleClick}>
                    <li>Actions</li>
                </Link>
                <Link to="/aventure" onClick={handleClick}>
                    <li>Aventure</li>
                </Link>
                <Link to="/comedie" onClick={handleClick}>
                    <li>Comédie</li>
                </Link>
                <Link to="/horreur" onClick={handleClick}>
                    <li>Horreur</li>
                </Link>
                <Link to="/thriller" onClick={handleClick}>
                    <li>Thriller</li>
                </Link>
                <Link to="/favoris" onClick={handleClick}>
                    <li>Favoris</li>
                </Link>
            </ul>
        </nav>
    )
};

const mapStateToProps = state => {
    return {
        filmSearch: state.filmSearch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFilmsSearch: ({search, page}) => dispatch(fetchFilmsSearch({search, page})),
        fetchFilmsSearchRefresh: () => dispatch(fetchFilmsSearchRefresh())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);