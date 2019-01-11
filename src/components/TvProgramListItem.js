import React  from 'react';
import { NavLink } from 'react-router-dom'
import '../css/ListItem.css'

const TvProgramListItem = (props) => {

    return(
        <NavLink key={props.station.name} to={{
            pathname: '/tvprograms/'.concat(props.station.name),
        }} className="movieListItem" >
            <div className="moviePreview">
                <h2 id="title">{props.station.name}</h2>
            </div>
        </NavLink>
    );
}

export default TvProgramListItem;