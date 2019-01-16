import React  from 'react';
import '../css/ListItem.css'

const MovieListItem = (props) => {

    const year = props.movie.dateOfPremiere.substring(0,4);
    const genre = props.movie.genre.join(", ");

    return(
        <div className="movieListItem">
           <img className="coverage" src={props.movie.pictureUrl} alt={"coverage for movie " + props.movie.title}></img>
                   
                   <div className="moviePreview">
                       <h2 id="title">{props.movie.title} ({year})</h2>
                       <p className="plainText">Genre: {genre}</p>
                   </div>
        </div>
    );
}

export default MovieListItem;