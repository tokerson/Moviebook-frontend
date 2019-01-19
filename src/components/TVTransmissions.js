import React from 'react';
import '../css/CastList.css';

const TVTransmissions = (props) => {

  let key = 0;
  const transmissions = props.transmissions ? props.transmissions.map( transmission => {
    key++;
    return(
          <div className="castItemWrapper" key={key}>
              <div style={{marginLeft:"10px", marginRight:"10px"}}>
                <h2><b>{transmission.station}</b></h2>
              </div>
              <h4>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(transmission.dateTime)}</h4>
            
          </div>
          
      )
  }) : null;

  return (
    <div>
      <h2>TV Transmissions</h2>
      <div className="castWrapper">
        {transmissions}
      </div>
    </div>
  );
}

export default TVTransmissions;