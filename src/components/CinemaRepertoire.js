import React from 'react';
import '../css/CastList.css';

const CinemaRepertoire = (props) => {

  let key = 0
  const repertoire = props.repertoire ? props.repertoire.map( repertoire => {
    
    key++;
      return(
          <div className="castItemWrapper" key={key} >
              <div style={{marginLeft:"10px", marginRight:"10px"}}>
                <h3><b>{repertoire.cinemaName} in {repertoire.city}</b></h3>
              </div>
              <h4>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(repertoire.dateTime)}</h4>
          </div>
      )
  }) : null;

  return (
    <div>
      <h2>Cinema shows</h2>
      <div className="castWrapper">
        {repertoire}
      </div>
    </div>
  );
}

export default CinemaRepertoire;