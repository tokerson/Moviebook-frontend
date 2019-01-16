import React from 'react';
import '../css/ListItem.css'
import '../css/ScrollListItem.css'

const ScrollArtistListItem = (props) => {

        const classname = props.selected ? "scrollListItemSelected" : "scrollListItem";
        return(
            <div key={props.artist.id} className={classname}>
    
                <div className="scrollListItemAvatar">
                    <img src={props.artist.pictureUrl} alt={"picture" + props.artist.name + props.artist.surname}></img>
                </div>
                <div className="moviePreview">
                    <h2 id="title">{props.artist.name} {props.artist.surname}</h2>
                </div>
    
            </div>
        );
    
}

export default ScrollArtistListItem;