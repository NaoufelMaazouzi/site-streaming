import React from 'react';
import './Header.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import { Link } from 'react-router-dom';

const Header = ({ getMovies, refresh, drawerClickHandler }) => {


    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__toggle-button">
                    <DrawerToggleButton click={drawerClickHandler} />
                </div>
                <div className="toolbar__logo"><a href="/">Naou</a></div>
                <div className="spacer"></div>
                <div className="toolbar_navigation-items">
                    <ul>
                        <Link to="/" exact onClick={refresh}>
                            <li>Accueil</li>
                        </Link>
                        <Link to="/actions" onClick={refresh}>
                            <li>Actions</li>
                        </Link>
                        <Link to="/aventure" onClick={refresh}>
                            <li>Aventure</li>
                        </Link>
                        <Link to="/comedie" onClick={refresh}>
                            <li>Comédie</li>
                        </Link>
                        <Link to="/horreur" onClick={refresh}>
                            <li>Horreur</li>
                        </Link>
                        <Link to="/thriller" onClick={refresh}>
                            <li>Thriller</li>
                        </Link>
                    </ul>
                    <form onSubmit={getMovies} >
                        <input className="searchInput" type="text" placeholder="Titre du film" name="nomFilm"></input>
                    </form>
                </div>
            </nav>
        </header>

    );
}




export default Header;