import React, { useState } from 'react';
import './App.css';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Navbar/Header';
import FilmsWithGenres from './Components/FilmsWithGenres/FilmsWithGenres';
import FilmsDetails from './Components/FilmsDetails/FilmsDetails';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import Backdrop from './Components/Backdrop/Backdrop';

const App = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }

  return (
    <Router>
      <SnackbarProvider maxSnack={3}>
        <div className="body">
          Test

          <Header drawerClickHandler={drawerToggleClickHandler} />
          <SideDrawer closeSide={backdropClickHandler} show={sideDrawerOpen} />
          {backdrop}
          <Switch>
            <Route path="/" exact component={(props) => <FilmsWithGenres id="" titreSection="FILMS POPULAIRES" key={props.location.key} />} />
            <Route path="/actions" component={(props) => <FilmsWithGenres id="28" titreSection={"FILMS D'ACTION"} key={props.location.key} />} />
            <Route path="/aventure" component={(props) => <FilmsWithGenres id="12" titreSection={"FILMS D'AVENTURE"} key={props.location.key} />} />
            <Route path="/comedie" component={(props) => <FilmsWithGenres id="35" titreSection="COMEDIE" key={props.location.key} />} />
            <Route path="/horreur" component={(props) => <FilmsWithGenres id="27" titreSection={"FILMS D'HORREUR"} key={props.location.key} />} />
            <Route path="/thriller" component={(props) => <FilmsWithGenres id="53" titreSection="THRILLER" key={props.location.key} />} />
            <Route path="/favoris" component={(props) => <FilmsWithGenres id="" titreSection="FAVORIS" key={props.location.key} />} />
            <Route path="/details/:id" component={FilmsDetails} />
          </Switch>
        </div>
      </SnackbarProvider>
    </Router>
  );
};

export default App;
