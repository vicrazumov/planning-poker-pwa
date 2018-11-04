import React from 'react';
import PropTypes from 'prop-types'

import './Card.css'

const Card = ({ value, image, hidden }) => (
  <div className={hidden ? 'cardContainer hidden' : 'cardContainer'}>
    <div className="flipper">
      <div className="front">
        <div className="cardCorners">
          <div className="NW">{value}</div>
          <div className="NE">{value}</div>
        </div>
        <div className="cardValue">
          {value}
        </div>
        <div className="cardCorners">
          <div className="SW">{value}</div>
          <div className="SE">{value}</div>
        </div>
      </div>
      <div className="back">
        <div className="credits">Planning Poker PWA by <a href="https://twitter.com/vicrazumov">@vicrazumov</a></div>
      </div>
    </div>
  </div>
)

Card.propTypes = {
  value: PropTypes.string.isRequired,
  image: PropTypes.string,
  hidden: PropTypes.bool,
}

export default Card
