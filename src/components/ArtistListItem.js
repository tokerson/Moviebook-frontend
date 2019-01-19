import React  from 'react';
import { NavLink } from 'react-router-dom'
import '../css/ListItem.css'

const ArtistListItem = (props) => {

    return(
        <NavLink key={props.artist.id} to={{
            pathname: '/artists/'.concat(props.artist.id)
        }} className="movieListItem" >

            <div className="listItemAvatar">
                <img src={props.artist.pictureUrl} alt={"picture" + props.artist.name + props.artist.surname}></img>
            </div>
            <div className="moviePreview">
                <h2 id="title">{props.artist.name} {props.artist.surname}</h2>
            </div>

        </NavLink>
    );
}

export default ArtistListItem;