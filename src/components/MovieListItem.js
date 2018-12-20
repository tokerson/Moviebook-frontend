import React , { Component } from 'react';
import {NavLink} from 'react-router-dom'
import styles from '../css/App.css';

const MovieListItem = (props) => {

    const movies = props.movies.map(movie => {
        
        return (
            <div>
            <NavLink to={{
                pathname: '/films/'.concat(movie.id + '/' + movie.title),
                params: movie
                }} className="list_links" >
                <h3>{movie.id} {movie.title}</h3>
            </NavLink>
            </div> 
      )
    });

    return(
        <div>
           {movies}
        </div>
    );
}

export default MovieListItem;