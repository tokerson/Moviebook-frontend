import React  from 'react';
import '../css/ListItem.css'

const ArtistListItem = (props) => {

    return(
        
       <div className="movieListItem">
            <div className="listItemAvatar">
                <img src={props.artist.pictureUrl} alt={"picture" + props.artist.name + props.artist.surname}></img>
            </div>
            <div className="moviePreview">
                <h2 id="title">{props.artist.name} {props.artist.surname}</h2>
            </div>
        </div>
    );
}

export default ArtistListItem;