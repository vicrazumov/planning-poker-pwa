import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './CardList.css'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'

import CARDS from './Cards'
import {
  DEFAULT_TRANSITION_TIMING,
  SCREEN_WIDTH,
  INDEX_CHANGE_THRESHOLD,
  MAX_TRANSFORM,
  ONE_CARD_TRANSITION_TIMING,
  MULTIPLE_CARDS_TRANSITION_TIMING,
  LIST_WIDTH,
  FAST_SWIPE_THRESHOLD,
} from './constants'

let clientX = null
let startX = null
let startTime = null

const CardList = ({ onIndexChange }) => {
  const [transformX, setTransformX] = useState(0)
  const [transitionTiming, setTransitionTiming] = useState(DEFAULT_TRANSITION_TIMING)
  const scroll = (value, delay) => {
    setTransformX(value)
    setTransitionTiming(delay)
  }
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

    const relativeTransform = (transformX + clientX) / SCREEN_WIDTH

    let newIndex = index

    const moveTime = new Date().getTime() - startTime

    if (moveTime <= FAST_SWIPE_THRESHOLD || Math.abs(relativeTransform) >= INDEX_CHANGE_THRESHOLD) {
      if (relativeTransform > 0) {
        newIndex += Math.min(Math.round(-relativeTransform), -1)
      } else if (relativeTransform < 0) {
        newIndex += Math.max(Math.round(-relativeTransform), 1)
      }
    }

    handleIndexChange(newIndex)
  }

  const handleTouchMove = event => {
    if (hidden) return

    const { touches: [{ clientX: _clientX }] } = event
    const offset = _clientX - startX
    const newOffset = offset - clientX

    if (newOffset > 0 || newOffset < MAX_TRANSFORM) return

    scroll(newOffset, DEFAULT_TRANSITION_TIMING)
  }

  const handleIndexChange = newIndex => {
    if (hidden) return

    clientX = newIndex * SCREEN_WIDTH

    const diff = Math.abs(newIndex - index)
    const delay = diff > 1 ? diff * MULTIPLE_CARDS_TRANSITION_TIMING : ONE_CARD_TRANSITION_TIMING

    setIndex(newIndex)
    scroll(-clientX, delay)

    if (onIndexChange && newIndex !== index) onIndexChange(newIndex)
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <Pagination
        hidden={hidden}
        cards={CARDS}
        onIndexChange={handleIndexChange}
        activeIndex={index}
        data={transformX}
      />
      <div
        className="cardList"
        style={{
          width: `${LIST_WIDTH}px`,
          transform: `translateX(${transformX}px)`,
          transition: `transform ease-in-out ${transitionTiming}ms`
        }}
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
    </div>
  )
}

CardList.propTypes = {
  onIndexChange: PropTypes.func,
}

export default CardList