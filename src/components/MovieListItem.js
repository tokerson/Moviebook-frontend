import React  from 'react';
import {NavLink} from 'react-router-dom'

const MovieListItem = (props) => {

    const movies = props.movies.map(movie => {
        
        return (
            <div key={movie.id}>
            <NavLink to={{
                pathname: '/films/'.concat(movie.title),
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