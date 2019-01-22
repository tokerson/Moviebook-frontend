import React from 'react';
import '../css/Portfolio.css'

const Portfolio = (props) => {

    let classname = props.norbs ? "norbs" : "portrait"

    return(
        <div className="portfolioItem">
            <div className="portraitWrapper">
                <img className={classname} src={props.portraitUrl} alt="portrait">
                </img>
            </div>
            
            <span>
                <b>{props.name}</b>
            </span>
            <span>
                <i>{props.responsibility}</i>
            </span>
        </div>
    );
}

export default Portfolio;