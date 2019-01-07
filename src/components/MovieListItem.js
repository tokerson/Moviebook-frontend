import React  from 'react';
import { NavLink } from 'react-router-dom'
import '../css/ListItem.css'

const MovieListItem = (props) => {

    const movies = props.movies && props.movies.length > 0 ? 
        
        props.movies.map(movie => {

        const year = movie.dateOfPremiere.substring(0,4);
        const genre = movie.genre.join(", ");

        return (
                <NavLink key={movie.idMovie} to={{
                    pathname: '/films/'.concat(movie.idMovie + "/").concat(movie.title),
                    }} className="movieListItem" >

                    
                    <img className="coverage" src={movie.pictureUrl} alt={"coverage for movie " + movie.title}></img>
                   
                    <div className="moviePreview">
                        <h2 id="title">{movie.title} ({year})</h2>
                        <p className="plainText">Genre: {genre}</p>
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