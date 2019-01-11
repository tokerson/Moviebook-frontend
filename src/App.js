import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './css/App.css';

import Home from './components/Home';
import Header from './components/Header';
import AdminTools from './components/AdminTools';
import Account from './components/Account';
import SalesmanTools from './components/SalesmanTools';
import EditorTools from './components/EditorTools';
import MovieListContainer from './containers/MovieListContainer';
import Movie from './components/Movie';
import AristList from './components/ArtistList';
import CinemaList from './components/CinemaList';
import FilmCinema from './components/FilmCinema';
import AddMovieComponent from './components/AddMovieComponent';


class App extends Component {
  

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/artists" component={AristList} />
          <Route exact path="/films/:id/:title" component={Movie}></Route>
          <Route exact path="/films" component={MovieListContainer} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/adminTools" component={AdminTools} />
          <Route exact path="/salesmanTools" component={SalesmanTools} />
          <Route exact path="/editorTools" component={EditorTools} />
          <Route exact path="/cinemas" component={CinemaList} />
          <Route exact path="/addMovie" component={AddMovieComponent} />
          <Route exact path="/cinemas/:id" component={FilmCinema} />

          

        </div>
      </Router>
    );
  }
}

export default App;