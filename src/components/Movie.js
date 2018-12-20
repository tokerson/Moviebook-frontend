import React from 'react';

const Movie = (props) => {

    console.log(props);
    // console.log(props.match.params.id + " " + props.match.params.title)

    return(
        <div>
            <h3>Title : {props.location.params.title}</h3>
            <h3>Director: {props.location.params.director}</h3>
        </div>
    );
}

export default Movie;