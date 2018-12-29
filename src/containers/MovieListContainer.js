import React , { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { movieListAll } from '../actions';

import MovieListItem from "../components/MovieListItem"
import TextField from '@material-ui/core/TextField';

import "../css/MovieList.css"

class MovieListContainer extends Component {

  //this function filters json, looking for a title corresponding to given word
  
  componentWillMount() {
    this.props.movieListAll();
    console.log(this.props)
  }

  state = {
    filtered : [],
    searching : false
  }

  filterMovies = (event) => {
    let filtered = this.props.movies.movieList.filter(item => {
      //toUpperCase, so user doesn't have to bother about Upper or Lower case sensitive titles.
      return item.title.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1;
    });

    this.setState({
      filtered: filtered,
      searching:  event.target.value.length > 0 
    });

    // return filtered;
    console.log(event.target.value)
  }


  render() {
    //we want to display either whole list of movies or filtered list depending on the users input  
    let movies = this.state.filtered.length === 0 ? this.props.movies.movieList : this.state.filtered;
    if(this.state.filtered.length === 0 && this.state.searching === true) {
      movies = []
    }
    
    return (
      <div>
          <TextField id="outlined-search" label="Search" margin="normal" varian="outlined" onChange={this.filterMovies}></TextField>
          <MovieListItem className="list" movies={movies}/>          
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
      movies:state.movies
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ movieListAll }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(MovieListContainer);