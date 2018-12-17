import React from 'react';

const Movie = (props) => {

    console.log(props.match.params.id + " " + props.match.params.title)
    return(
        <div>
            <h3>{props.match.params.id} {props.match.params.title}</h3>
        </div>
    );
}

export default Movie;