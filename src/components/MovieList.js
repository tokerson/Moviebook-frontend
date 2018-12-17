import React , { Component } from 'react';


import JSON from '../json/Movies.json';
import MovieListItem from "./MovieListItem"
import Movie from "./Movie"

class MovieList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      movies : JSON
    }
  }
  render() {
    return (
      <div>
          <MovieListItem movies={this.state.movies}/>          
      </div>
    );
  }
}

export default MovieList;