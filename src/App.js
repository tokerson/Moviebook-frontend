import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './css/App.css';

import Home from './components/Home';
import Header from './components/Header';
import AdminTools from './components/AdminTools';
import SalesmanTools from './components/SalesmanTools';
import EditorTools from './components/EditorTools';
import MovieListContainer from './containers/MovieListContainer';
import Movie from './components/Movie';
import AristList from './components/ArtistList';
import CinemaList from './components/CinemaList';
import FilmCinema from './components/FilmCinema';
import AddMovieComponent from './components/AddMovieComponent';
import TvProgramList from './components/TvProgramList';
import TvProgramFilms from './components/TvProgramFilms';
import Account from './components/Account';
import Artist from './components/Artist';
import AddArtist from './components/AddArtistComponent';
import IssuesList from './components/IssuesList';
import AddCinemaComponent from './components/AddCinemaComponent';
import AddTVStationComponent from './components/AddTVStationComponent';
import EditArtistComponent from './components/EditArtistComponent';
import EditArtistForm from './components/EditArtistForm';
import EditMovieComponent from './components/EditMovieComponent';
import EditMovieForm from './components/EditMovieForm';
import UsersList from './components/UsersList';
import AddShowComponent from './components/AddShowComponent';
import AddTransmissionComponent from './components/AddTransmissionComponent';
import ToWatchList from './components/ToWatchList';
import ChangePasswordComponent from './components/ChangePasswordComponent';
import StatisticsComponent from './components/StatisticsComponent';
import AddPrizeForm from './components/AddPrizeForm';


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
          <Route exact path="/editorTools" component={EditorTools} />
          <Route exact path="/cinemas" component={CinemaList} />
          <Route exact path="/cinemas/:id" component={FilmCinema} />
          <Route exact path="/tvprograms/" component={TvProgramList} />
          <Route exact path="/tvprograms/:id" component={TvProgramFilms} />
          <Route exact path="/addMovie" component={AddMovieComponent} />
          <Route exact path="/artists/:id" component={Artist} />
          <Route exact path="/addArtist/" component={AddArtist} />
          <Route exact path="/showIssues" component={IssuesList} />
          <Route exact path="/addCinema" component={AddCinemaComponent} />
          <Route exact path="/addStation" component={AddTVStationComponent} />
          <Route exact path="/editArtist" component={EditArtistComponent} />
          <Route exact path="/editArtist/:id" component={EditArtistForm} />
          <Route exact path="/editMovie" component={EditMovieComponent} />
          <Route exact path="/editMovie/:id" component={EditMovieForm} />
          <Route exact path="/usersList" component={UsersList} />
          <Route exact path="/addShow" component={AddShowComponent} />
          <Route exact path="/addTransmission" component={AddTransmissionComponent} />
          <Route exact path="/watchList/:username" component={ToWatchList} />
          <Route exact path="/changePassword/:username" component={ChangePasswordComponent} />
          <Route exact path="/salesmanTools" component={SalesmanTools} />
          <Route exact path="/showStatistics" component={StatisticsComponent} />
          <Route exact path="/addPrize" component={AddPrizeForm} />
        </div>
      </Router>
    );
  }
}

export default App;