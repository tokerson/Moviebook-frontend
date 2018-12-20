import React , { Component } from 'react';


import JSON from '../json/Movies.json';
import MovieListItem from "./MovieListItem"

class MovieList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      movies : JSON,
      filtered : [],
      searching : false
    }
  }


  //this function filters json, looking for a title corresponding to given word
  filterMovies = (event) => {
    let filtered = this.state.movies.filter(item => {
      //toUpperCase, so user doesn't have to bother about Upper or Lower case sensitive titles.
      return item.title.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1;
    });

    this.setState({
      filtered: filtered,
      searching:  event.target.value.length > 0 
    });
  }

  render() {

    //we want to display either whole list of movies or filtered list depending on the users input
    let movies = this.state.filtered.length === 0 ? this.state.movies : this.state.filtered;
    if(this.state.filtered.length === 0 && this.state.searching === true) {
      movies = []
    }
    
    return (
      <div>
          <input type="text" onChange={this.filterMovies} placeholder="Search"></input>
          <MovieListItem movies={movies}/>          
      </div>
    );
  }
}

export default MovieList;