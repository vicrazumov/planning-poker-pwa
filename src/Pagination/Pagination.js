import React, { useState, useEffect } from 'react'

import './Pagination.css'

let activeTimer = null
const ACTIVE_TIMEOUT = 2000

const Pagination = ({ hidden, cards, onIndexChange, activeIndex }) => {
  const [active, setActive] = useState(true)

  const visible = active && !hidden

  useEffect(() => {
    setActive(true)
    clearTimeout(activeTimer)
    activeTimer = setTimeout(() => {
      setActive(false)
      activeTimer = null
    }, ACTIVE_TIMEOUT)
  }, [activeIndex])

  return (
    <div
      className={`pagination ${visible ? '' : 'hidden'}`}
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

export default Pagination;