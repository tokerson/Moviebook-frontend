import React , { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { movieListAll } from '../actions';
import axios from 'axios';
import MovieList from "../components/MovieList"
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


import "../css/MovieList.css"

const URL = 'http://localhost:8080';

class MovieListContainer extends Component {

  //this function filters json, looking for a title corresponding to given word
  
  componentWillMount() {
    this.props.movieListAll().then( () => {this.setState({
      movies:this.props.movies.movieList
    })});
    this.getGenres();
  }

  state = {
    movies:[],
    filtered : [],
    searching : false,
    genre:"",
    genres: []
  }

  getGenres = () => {
      axios.get(`${URL}/getAllGenres`)
           .then( response => {
             this.setState({
               genres: response.data
             })
           })
  }

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

  showMoviesOfGenre = (event) => {

    this.setState({
      genre: event.target.value
    })
    console.log(event.target.value)
    if(event.target.value !== "None"){
      axios.get(`${URL}/allMoviesOfTheGenre/${event.target.value}`)
          .then( response => {
            this.setState({
              movies: response.data
            })
          }).catch (err => console.log(err))
    }
    else this.props.movieListAll().then( () => {this.setState({
      movies:this.props.movies.movieList,
      filtered : [],
      searching : false,
      genre:""
    })});
  }

  render() {
    //we want to display either whole list of movies or filtered list depending on the users input  
    let movies = this.state.filtered.length === 0 ? this.state.movies : this.state.filtered;
    if(this.state.filtered.length === 0 && this.state.searching === true) {
      movies = []
    }
    
    return (
      <div>
          <TextField id="outlined-search" style={{ verticalAlign: "baseline"}} label="Search" margin="normal" varian="outlined" onChange={this.filterMovies}></TextField>
          <FormControl margin="dense" style={{minWidth:"80px", marginLeft:"5px", verticalAlign: "baseline"}}>
            <InputLabel htmlFor="age-simple">Genre</InputLabel>
            <Select value={this.state.genre} onChange={this.showMoviesOfGenre} label="Genre" id="genre" name="genre" >
              <MenuItem value="None">
                None
              </MenuItem>
              {this.state.genres.map(genre => (
                <MenuItem key={genre.name} value={genre.name} >
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>  
          <MovieList className="list" movies={movies}/>          
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
      movies:state.movies
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ movieListAll }, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(MovieListContainer);