import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';

const sideDrawer = ({ getMovies, refresh, click, show }) => {
    let drawerClasses = 'side-drawer';
    if (show) {
        drawerClasses = 'side-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                <form onSubmit={getMovies} >
                    <input className="sideSearchInput" type="text" placeholder="Titre du film" name="nomFilm"></input>
                </form>
                <Link to="/" exact onClick={refresh, click}>
                    <li>Accueil</li>
                </Link>
                <Link to="/actions" onClick={refresh, click}>
                    <li>Actions</li>
                </Link>
                <Link to="/aventure" onClick={refresh, click}>
                    <li>Aventure</li>
                </Link>
                <Link to="/comedie" onClick={refresh, click}>
                    <li>Comédie</li>
                </Link>
                <Link to="/horreur" onClick={refresh, click}>
                    <li>Horreur</li>
                </Link>
                <Link to="/thriller" onClick={refresh, click}>
                    <li>Thriller</li>
                </Link>
            </ul>

        </nav>
    )
};

export default sideDrawer;