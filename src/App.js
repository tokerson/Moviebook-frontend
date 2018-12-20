import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './css/App.css';

import Home from './components/Home';
import Actors from './components/Actors'
import MovieList from './components/MovieList'
import Movie from './components/Movie'

import axios from 'axios'; //temporary

class App extends Component {
  componentDidMount() {
    axios.get('http://localhost:8080/')
      .then(res => {
        console.log(res.data) //pojawia się w consoli :) backend dziala
      })
  }

  render() {
    return (
      <Router>
        <div>
          <Toolbar className="toolbar">
            <Button component={Link} to="/" variant="outlined" size="small">
              Home
            </Button>
            <Typography variant="title" align="center" noWrap className="title">MovieBook</Typography>
            <Button variant="outlined" size="small">
              Sign up
            </Button>
          </Toolbar>      
          <Toolbar variant="dense">
            <Button size="small" component={Link} to="/films">films</Button>
            <Button size="small" component={Link} to="/actors">actors</Button>
          </Toolbar>
          <Route exact path="/" component={Home} />
          <Route exact path="/actors" component={Actors} />
          <Route exact path="/films/:title" component={Movie}></Route>
          <Route exact path="/films" component={MovieList} />

        </div>
      </Router>
    );
  }
}

export default App;