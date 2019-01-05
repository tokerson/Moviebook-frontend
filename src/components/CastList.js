import React from 'react';
import '../css/CastList.css';

const CastList = (props) => {

  const actors = props.actors ? props.actors.map( actor => {
      return(
          <div className="castItemWrapper" key={actor.idArtist}>
              <div className="actorAvatar">
                <img src={actor.pictureUrl} alt={actor.surname}></img>
              </div>
              <p><b>{actor.name} {actor.surname}</b> <i>as {actor.role}</i></p>
          </div>
      )
  }) : null;

  return (
    <div>
      <h2>Cast</h2>
      <div className="castWrapper">
        {actors}
      </div>
    </div>
  );
}

export default CastList;