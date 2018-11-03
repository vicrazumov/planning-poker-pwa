import React from 'react';
import './Card.css';

const Card = ({value, image}) => {
  return (
    <div className="cardContainer">
      <div className="cardCorners">
        <div className="N">
          <div className="NW">{value}</div>
          <div className="NE">{value}</div>
        </div>
        <div className="S">        
          <div className="SW">{value}</div>
          <div className="SE">{value}</div>
        </div>
      </div>
      <div className="cardValue">
        {value}
      </div>      
    </div>
  );
}

export default Card;
