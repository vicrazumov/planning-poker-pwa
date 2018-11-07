import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './Pagination.css'

let activeTimer = null
const ACTIVE_TIMEOUT = 2000

const Pagination = ({ hidden, cards = [], onIndexChange, activeIndex, data }) => {
  const [active, setActive] = useState(true)

  const visible = active && !hidden

  useEffect(() => {
    setActive(true)

    clearTimeout(activeTimer)
    activeTimer = setTimeout(() => {
      setActive(false)
      activeTimer = null
    }, ACTIVE_TIMEOUT)

  }, [activeIndex, data])

  return (
    <div
      className={`pagination ${visible ? '' : 'hidden'}`}
      style={hidden ? { zIndex: 0 } : {}}
    >
      {
        cards.map((card, idx) => (
          <button
            key={`btn-${idx}`}
            className={idx === activeIndex ? 'paginationButton active' : 'paginationButton'}
            onClick={() => onIndexChange(idx)}
          >{card.value}</button>
        ))
      }
    </div>
  );
}

Pagination.propTypes = {
  hidden: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired })),
  onIndexChange: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  data: PropTypes.any,
}

export default Pagination