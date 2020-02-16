import React, { useState } from 'react';
import './App.css';
import Header from './Components/Navbar/Header';
import FilmsWithGenres from './Components/FilmsWithGenres/FilmsWithGenres';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FilmsDetails from './Components/FilmsDetails/FilmsDetails';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import Backdrop from './Components/Backdrop/Backdrop';



const App = () => {

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);


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
        <Header drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer click={backdropClickHandler} show={sideDrawerOpen} />
        {backdrop}
        <Switch>
          <Route path="/" exact component={() => <FilmsWithGenres id={''} titreSection={"FILMS POPULAIRES"} />} />
          <Route path="/actions" component={() => <FilmsWithGenres id={`28`} titreSection={"FILMS D'ACTIONS"} />} />
          <Route path="/aventure" component={() => <FilmsWithGenres id={`12`} titreSection={"FILMS D'AVENTURE"} />} />
          <Route path="/comedie" component={() => <FilmsWithGenres id={`35`} titreSection={"COMEDIE"} />} />
          <Route path="/horreur" component={() => <FilmsWithGenres id={`27`} titreSection={"FILMS D'HORREUR"} />} />
          <Route path="/thriller" component={() => <FilmsWithGenres id={`53`} titreSection={"THRILLER"} />} />
          <Route path="/:id" component={FilmsDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
