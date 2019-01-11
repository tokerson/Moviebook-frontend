import React  from 'react';
import { NavLink } from 'react-router-dom'
import '../css/ListItem.css'

const CinemaListItem = (props) => {

    return(
        <NavLink key={props.cinema.idCinema} to={{
            pathname: '/cinemas/'.concat(props.cinema.idCinema),
        }} className="movieListItem" >
            <div className="moviePreview">
                <h2 id="title">{props.cinema.name} {props.cinema.city}</h2>
            </div>
        </NavLink>
    );
}

export default CinemaListItem;