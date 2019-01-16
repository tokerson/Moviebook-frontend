import React  from 'react';
import { NavLink } from 'react-router-dom'
import '../css/ListItem.css'
import MovieListItem from './MovieListItem';

const MovieList = (props) => {

    const movies = props.movies && props.movies.length > 0 ? 
        
        props.movies.map(movie => {

        return (
                <NavLink key={movie.idMovie} to={{
                    pathname: '/films/'.concat(movie.idMovie + "/").concat(movie.title),
                    }} style={{textDecoration:'none'}}>

                    <MovieListItem movie={movie}/>

                </NavLink>
         )
        }) : null;

    return(
        <div >
           {movies}
        </div>
    );
}

export default MovieList;