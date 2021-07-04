import React, { useEffect, useState } from 'react';
import './Header.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import { Link, useHistory } from 'react-router-dom';
import { fetchFilmsSearch, fetchFilmsSearchRefresh } from '../../redux/filmSearch/filmSearchActions';
import { connect } from 'react-redux';

const Header = ({ drawerClickHandler, fetchFilmsSearch, fetchFilmsSearchRefresh }) => {
    const [activeLink, setActiveLink] = useState('');
    const history = useHistory();

    const _onSubmit = (e) => {
        e.preventDefault();
        history.push(`/?search=${e.target.elements.nomFilm.value}&page=1`);
        e.target.elements.nomFilm.value = '';
    }

    useEffect(() => {
        setActiveLink(history.location.pathname)
    }, [])

    // Function to change color of links header
    const handleClick = (pathName) => {
        setActiveLink(pathName);
        return fetchFilmsSearchRefresh();
    }

    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__toggle-button">
                    <DrawerToggleButton click={drawerClickHandler} />
                </div>
                <div className="toolbar__logo">
                    <a href="/"><img alt={""} className="logo" src="/Logo2Canal-.jpg"/></a>
                </div>
                <div className="spacer"></div>
                <div className="toolbar_navigation-items">
                    <ul>
                        <Link to="/?page=1" exact onClick={() => handleClick('/')}>
                            <li className={activeLink === '/' ? 'activeLink' : ''}>Accueil</li>
                        </Link>
                        <Link to="/actions?page=1" onClick={() => handleClick('/actions')}>
                            <li className={activeLink === '/actions' ? 'activeLink' : ''}>Action</li>
                        </Link>
                        <Link to="/aventure?page=1" onClick={() => handleClick('/aventure')}>
                            <li className={activeLink ==='/aventure' ? 'activeLink' : ''}>Aventure</li>
                        </Link>
                        <Link to="/comedie?page=1" onClick={() => handleClick('/comedie')}>
                            <li className={activeLink === '/comedie' ? 'activeLink' : ''}>Comédie</li>
                        </Link>
                        <Link to="/horreur?page=1" onClick={() => handleClick('/horreur')}>
                            <li className={activeLink === '/horreur' ? 'activeLink' : ''}>Horreur</li>
                        </Link>
                        <Link to="/thriller?page=1" onClick={() => handleClick('/thriller')}>
                            <li className={activeLink === '/thriller' ? 'activeLink' : ''}>Thriller</li>
                        </Link>
                        <Link to="/favoris?page=1" onClick={() => handleClick('/favoris')}>
                            <li className={activeLink === '/favoris' ? 'activeLink' : ''}>Favoris</li>
                        </Link>
                    </ul>
                    <form onSubmit={_onSubmit}>
                        <input className="searchInput" type="text" placeholder="Rechercher..." name="nomFilm"></input>
                    </form>
                </div>
            </nav>
        </header>

    );
}

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



export default connect(mapStateToProps, mapDispatchToProps)(Header);