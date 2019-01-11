import React from 'react';
import { NavLink } from 'react-router-dom'
const FilmCinemaItem = (props) => {
    return(
        <NavLink key={props.index} to={{
            pathname: '/films/'.concat(props.show.idMovie+"/").concat(props.show.title),
        }} className="movieListItem" >
            <div className="moviePreview">
                <h3 id="show">{props.show.title}</h3> 
                <h4>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(props.show.dateTime)}</h4>
            </div>
        </NavLink>
    );
}

export default FilmCinemaItem;