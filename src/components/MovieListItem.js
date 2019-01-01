import React  from 'react';
import { NavLink } from 'react-router-dom'
import '../css/MovieListItem.css'

const MovieListItem = (props) => {

    const movies = props.movies && props.movies.length > 0 ? 
        
        props.movies.map(movie => {
        return (
                <NavLink key={movie.id} to={{
                    pathname: '/films/'.concat(movie.id + "/").concat(movie.title),
                    }} className="movieListItem" >

                    <img className="coverage" src={movie.coverURL} alt={"coverage for movie " + movie.title}></img>
                   
                    <div className="moviePreview">
                        <h2 id="title">{movie.title} ({movie.premiere})</h2>
                        <p className="plainText">Director: {movie.director}</p>
                    </div>


                </NavLink>
         )
        }) : null;

    return(
        <div>
           {movies}
        </div>
    );
}

export default MovieListItem;