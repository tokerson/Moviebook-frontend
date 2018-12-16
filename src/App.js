import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './App.css';

import Home from './Home';
import Actors from './Actors'
import Films from './Films'

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
            <Link className="links" to="/films">Films</Link>
            <Link className="links" to="/actors">Actors</Link>
          </Toolbar>
          <Route exact path="/" component={Home} />
          <Route path="/actors" component={Actors} />
          <Route path="/films" component={Films} />
        </div>
      </Router>
    );
  }
}

export default App;