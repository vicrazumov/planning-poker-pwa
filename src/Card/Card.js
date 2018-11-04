import React from 'react';
import PropTypes from 'prop-types'

import './Card.css'

const Card = ({ value, image, hidden }) => (
  <div className={hidden ? 'cardContainer hidden' : 'cardContainer'}>
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
)

Card.propTypes = {
  value: PropTypes.string.isRequired,
  image: PropTypes.string,
  hidden: PropTypes.bool,
}

export default Card
