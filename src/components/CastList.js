import React from 'react';

const CastList = (props) => {

  const actors = props.actors ? props.actors.map( actor => {
      return(
          <div key={actor.idArtist}>
              <p>{actor.name} {actor.surname}</p>
          </div>
      )
  }) : null;

  return (
    <div>
      {actors}
    </div>
  );
}

export default CastList;