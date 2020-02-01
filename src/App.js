import React, { useState } from 'react';
import './App.css';
import Header from './Components/Navbar/Header';
import FilmsWithGenres from './Components/FilmsWithGenres';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FilmsDetails from './Components/FilmsDetails';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import Backdrop from './Components/Backdrop/Backdrop';

const API_KEY = "c0f2b3829e285f40ea8719b23184af1b";


const App = () => {

  const [film, setFilm] = useState([]);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const getMovies = async e => {
    e.preventDefault();
    const searchFilm = e.target.elements.nomFilm.value;
    const api_call = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchFilm}&api_key=${API_KEY}&language=fr`
    );
    const data = await api_call.json();
    if (searchFilm) {
      setFilm(data.results);
    } else {
      console.log("resultat nul");
    }


  };

  const refresh = () => {
    setFilm([]);
  }

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  }

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  }

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }

  return (
    <Router>
      <div className="body">
        <Header getMovies={getMovies} refresh={refresh} drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer getMovies={getMovies} refresh={refresh} click={backdropClickHandler} show={sideDrawerOpen} />
        {backdrop}
        <Switch>
          <Route path="/" exact component={() => <FilmsWithGenres id={''} filmsSearch={film} titreSection={"FILMS POPULAIRES"} />} />
          <Route path="/actions" component={() => <FilmsWithGenres id={`28`} filmsSearch={film} titreSection={"FILMS D'ACTIONS"} />} />
          <Route path="/aventure" component={() => <FilmsWithGenres id={`12`} filmsSearch={film} titreSection={"FILMS D'AVENTURE"} />} />
          <Route path="/comedie" component={() => <FilmsWithGenres id={`35`} filmsSearch={film} titreSection={"COMEDIE"} />} />
          <Route path="/horreur" component={() => <FilmsWithGenres id={`27`} filmsSearch={film} titreSection={"FILMS D'HORREUR"} />} />
          <Route path="/thriller" component={() => <FilmsWithGenres id={`53`} filmsSearch={film} titreSection={"THRILLER"} />} />
          <Route path="/:id" component={FilmsDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
