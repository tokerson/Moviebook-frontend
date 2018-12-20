import React , { Component } from 'react';


import JSON from '../json/Movies.json';
import MovieListItem from "./MovieListItem"

class MovieList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      movies : JSON,
      filtered : []
    }
  }


  //this function filters json, looking for a title corresponding to given word
  filterMovies = (event) => {
    let filtered = this.state.movies.filter(item => {
      return item.title.indexOf(event.target.value) > -1;
    });

    this.setState({
      filtered: filtered
    });
  }

  render() {

    //we want to display either whole list of movies or filtered list depending on the users input
    const movies = this.state.filtered.length === 0 ? this.state.movies : this.state.filtered

    return (
      <div>
          
          <input type="text" onChange={this.filterMovies} placeholder="Search"></input>
          <MovieListItem movies={movies}/>          
      </div>
    );
  }
}

export default MovieList;