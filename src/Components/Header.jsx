import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Header = ({ getMovies, refresh }) => {


    return (
        <nav>
            <div className="logo">
                <h4>The nav</h4>
            </div>
            <ul className="nav-links">
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
            <div className="burger">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>

            <form onSubmit={getMovies} >
                <input className="searchInput" type="text" placeholder="Titre du film" name="nomFilm"></input>
            </form>
        </nav>

    );
}




export default Header;