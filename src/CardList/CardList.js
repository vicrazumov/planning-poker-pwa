import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './CardList.css'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'

import CARDS from './Cards'
import CONSTANTS from './constants'

let clientX = null
let startX = null
let startTime = null
let transitionTiming = CONSTANTS.DEFAULT_TRANSITION_TIMING

const CardList = ({ onIndexChange }) => {
  const [transformX, setTransformX] = useState(0)
  const setTransformInAF = value => requestAnimationFrame(() => setTransformX(value))
  const [index, setIndex] = useState(0)
  const [hidden, setHidden] = useState(false)

  const handleTouchStart = event => {
    if (hidden) return

    const { touches: [{ clientX: _clientX }] } = event
    startX = _clientX
    startTime = new Date().getTime()
  }

  const handleTouchEnd = event => {
    if (hidden) return

    const relativeTransform = (transformX + clientX) / CONSTANTS.SCREEN_WIDTH

    let newIndex = index

    if (relativeTransform >= CONSTANTS.INDEX_CHANGE_THRESHOLD) {
      newIndex += Math.min(Math.round(-relativeTransform), -1)
    } else if (relativeTransform <= -CONSTANTS.INDEX_CHANGE_THRESHOLD) {
      newIndex += Math.max(Math.round(-relativeTransform), 1)
    }

    handleIndexChange(newIndex)
    transitionTiming = CONSTANTS.DEFAULT_TRANSITION_TIMING
  }

  const handleTouchMove = event => {
    if (hidden) return

    const { touches: [{ clientX: _clientX }] } = event

    const offset = _clientX - startX

    const moveTime = new Date().getTime() - startTime
    let multiplier = 2
    if (moveTime > CONSTANTS.FAST_FORWARD_THRESHOLD_MS && Math.abs(offset / CONSTANTS.SCREEN_WIDTH) > CONSTANTS.FAST_FORWARD_THRESHOLD)
      multiplier = CONSTANTS.INCREASED_MULTIPLIER

    const newOffset = offset * multiplier - clientX

    if (newOffset > 0 || newOffset < CONSTANTS.MAX_TRANSFORM) return

    setTransformInAF(newOffset)
  }

  const handleIndexChange = newIndex => {
    if (hidden) return

    clientX = newIndex * CONSTANTS.SCREEN_WIDTH
    transitionTiming = Math.abs((newIndex - index)) * CONSTANTS.MULTIPLE_CARDS_TRANSITION_TIMING

    setIndex(newIndex)
    setTransformInAF(-clientX)

    if (onIndexChange && newIndex !== index) onIndexChange(newIndex)
  }

  return (
    <>
      <div
        className="cardList"
        style={{
          width: `${CONSTANTS.LIST_WIDTH}px`,
          transform: `translateX(${transformX}px)`,
          transition: `transform ease-in-out ${transitionTiming}ms`
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onClick={() => setHidden(!hidden)}
      >
        {
          CARDS.map((card, idx) => (
            <Card
              hidden={index === idx && hidden}
              key={`card-${idx}`}
              value={card.value}
              image={card.image}
              color={card.color}
              tintColor={card.tintColor}
              hideValue={card.hideValue}
            />
          ))
        }
      </div>
      <Pagination
        hidden={hidden}
        cards={CARDS}
        onIndexChange={handleIndexChange}
        activeIndex={index}
        data={transformX}
      />
    </>
  )
}

CardList.propTypes = {
  onIndexChange: PropTypes.func,
}

export default CardList