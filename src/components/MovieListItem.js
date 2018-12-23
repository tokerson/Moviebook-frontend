import React  from 'react';
import {NavLink} from 'react-router-dom'
import '../css/MovieListItem.css'

const MovieListItem = (props) => {

    const movies = props.movies.map(movie => {
        
        return (
            // <div key={movie.id} className="movieListItem">
                <NavLink to={{
                    pathname: '/films/'.concat(movie.title),
                    params: movie
                    }} className="movieListItem" >

                    <img className="coverage" src={movie.coverURL} alt={"coverage for movie " + movie.title}></img>
                   
                    <div className="moviePreview">
                        <h2 id="title">{movie.title} ({movie.premiere})</h2>
                        <p class="plainText">Director: {movie.director}</p>
                    </div>


                </NavLink>
            // </div> 
      )
    });

    return(
        <div>
           {movies}
        </div>
    );
}

export default MovieListItem;