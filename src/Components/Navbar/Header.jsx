import React from 'react';
import './Header.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import { Link } from 'react-router-dom';

import { fetchFilmsSearch, fetchFilmsSearchRefresh } from '../../redux/filmSearch/filmSearchActions';
import { connect, useDispatch } from 'react-redux';

const Header = ({ drawerClickHandler, fetchFilmsSearch }) => {
    const dispatch = useDispatch();

    const _onSubmit = (e) => {
        e.preventDefault();
        fetchFilmsSearch(e.target.elements.nomFilm.value);
        e.target.elements.nomFilm.value = '';
    }

    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__toggle-button">
                    <DrawerToggleButton click={drawerClickHandler} />
                </div>
                <div className="toolbar__logo"><a href="/"><img alt={""} className="logo" src="/Logo2Canal-.jpg"/></a></div>
                <div className="spacer"></div>
                <div className="toolbar_navigation-items">
                    <ul>
                        <Link to="/" exact onClick={() => dispatch(fetchFilmsSearchRefresh())}>
                            <li>Accueil</li>
                        </Link>
                        <Link to="/actions" onClick={() => dispatch(fetchFilmsSearchRefresh())}>
                            <li>Actions</li>
                        </Link>
                        <Link to="/aventure" onClick={() => dispatch(fetchFilmsSearchRefresh())}>
                            <li>Aventure</li>
                        </Link>
                        <Link to="/comedie" onClick={() => dispatch(fetchFilmsSearchRefresh())}>
                            <li>Comédie</li>
                        </Link>
                        <Link to="/horreur" onClick={() => dispatch(fetchFilmsSearchRefresh())}>
                            <li>Horreur</li>
                        </Link>
                        <Link to="/thriller" onClick={() => dispatch(fetchFilmsSearchRefresh())}>
                            <li>Thriller</li>
                        </Link>
                        <Link to="/favorites" onClick={() => dispatch(fetchFilmsSearchRefresh())}>
                            <li>Favoris</li>
                        </Link>
                    </ul>
                    <form onSubmit={_onSubmit}>
                        <input className="searchInput" type="text" placeholder="Titre du film" name="nomFilm"></input>
                    </form>
                </div>
            </nav>
        </header>

    );
}

const mapStateToProps = (state) => {
    return {
        filmSearch: state.filmSearch
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFilmsSearch: (search) => dispatch(fetchFilmsSearch(search))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Header);