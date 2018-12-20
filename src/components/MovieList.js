import React , { Component } from 'react';


import JSON from '../json/Movies.json';
import MovieListItem from "./MovieListItem"
import TextField from '@material-ui/core/TextField';

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
 /* <TextField
  id="outlined-search"
  label="Search field"
  type="search"
  className={classes.textField}
  margin="normal"
  variant="outlined"
/>*/
  render() {
//<input type="text" onChange={this.filterMovies} placeholder="Search"></input>
    //we want to display either whole list of movies or filtered list depending on the users input
    let movies = this.state.filtered.length === 0 ? this.state.movies : this.state.filtered;
    if(this.state.filtered.length === 0 && this.state.searching === true) {
      movies = []
    }
    
    return (
      <div>
          <TextField id="outlined-search" label="Search" margin="normal" varian="outlined" placeholder="Search" onChange={this.filterMovies}></TextField>
          <MovieListItem movies={movies}/>          
      </div>
    );
  }
}

export default MovieList;