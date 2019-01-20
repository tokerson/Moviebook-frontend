import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router'
import TextField from '@material-ui/core/TextField';
import '../css/AddMovieForm.css';
import axios from 'axios';
import MovieListItem from './MovieListItem'
import { NavLink } from 'react-router-dom'


const URL = 'http://localhost:8080';

class EditMovieComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            filtered : [],
            searching : false,
            movies:[]
        }
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

    componentWillMount(){
        this.getMovies();
    }

    getMovies = () => {
        axios.get(`${URL}/allMovies`)
        .then(response => {
            const movies = response.data;
            this.setState({ movies : movies });
        })
    }

    render(){

        let moviesList = this.state.filtered.length === 0 ? this.state.movies : this.state.filtered;
        if(this.state.filtered.length === 0 && this.state.searching === true) {
          moviesList = []
        }

        const movies = moviesList.map( movie => {
            return(
                <NavLink key={movie.idMovie} to={{
                    pathname: '/editMovie/'.concat(movie.idMovie)
                }} style={{textDecoration:"none", color:"black"}}>
                    <MovieListItem movie={movie} />
                </NavLink>
            ) 
        });
        return(
            <div>
                {
                this.props.login.status !== "Administrator" && this.props.login.status !== "Editor"
                    ? <Redirect to="/home"/>
                    : <div >
                    <TextField id="outlined-search" label="Search" margin="normal" varian="outlined" onChange={this.filterArtists}></TextField>
                    {movies}
                </div> }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}
export default connect(mapStateToProps)(EditMovieComponent);