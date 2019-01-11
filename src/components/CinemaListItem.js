import React  from 'react';
import { NavLink } from 'react-router-dom'
import '../css/ListItem.css'

const CinemaListItem = (props) => {

    return(
        <div key={props.cinema.id} className="movieListItem" >
            <div className="moviePreview">
                <h2 id="title">{props.cinema.name} {props.cinema.city}</h2>
            </div>
        </div>
    );
}

export default CinemaListItem;