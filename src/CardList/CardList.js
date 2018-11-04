import React, { useState } from 'react'

import './CardList.css'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'

const CARDS = [
  { value: 0, image: '' },
  { value: 0.5, image: '' },
  { value: 1, image: '' },
  { value: 2, image: '' },
  { value: 3, image: '' },
  { value: 5, image: '' },
  { value: 8, image: '' },
  { value: 13, image: '' },
  { value: 20, image: '' },
  { value: 40, image: '' },
  { value: 100, image: '' },
  { value: '?', image: '' },
  { value: '☕️', image: '' },
]

const SCREEN_WIDTH = window.innerWidth
const LIST_WIDTH = CARDS.length * SCREEN_WIDTH
const MAX_TRANSFORM = -(CARDS.length - 1) * SCREEN_WIDTH
const INDEX_CHANGE_THRESHOLD = 0.15 // relative to the screen width
const FAST_FORWARD_THRESHOLD_MS = 400
const FAST_FORWARD_THRESHOLD = 0.5 // relative to the screen width
const INCREASED_MULTIPLIER = 3
const DEFAULT_TRANSITION_TIMING = 300

let clientX = null
let startX = null
let startTime = null
let transitionTiming = DEFAULT_TRANSITION_TIMING

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

    const relativeTransform = (transformX + clientX) / SCREEN_WIDTH

    let newIndex = index

    if (relativeTransform >= INDEX_CHANGE_THRESHOLD) {
      newIndex += Math.min(Math.round(-relativeTransform), -1)
    } else if (relativeTransform <= -INDEX_CHANGE_THRESHOLD) {
      newIndex += Math.max(Math.round(-relativeTransform), 1)
    }

    handleIndexChange(newIndex)
    transitionTiming = DEFAULT_TRANSITION_TIMING
  }

  const handleTouchMove = event => {
    if (hidden) return

    const { touches: [{ clientX: _clientX }] } = event

    const offset = _clientX - startX

    const moveTime = new Date().getTime() - startTime
    let multiplier = 2
    if (moveTime > FAST_FORWARD_THRESHOLD_MS && Math.abs(offset / SCREEN_WIDTH) > FAST_FORWARD_THRESHOLD)
      multiplier = INCREASED_MULTIPLIER

    const newOffset = offset * multiplier - clientX

    if (newOffset > 0 || newOffset < MAX_TRANSFORM) return

    setTransformInAF(newOffset)
  }

  const handleIndexChange = newIndex => {
    if (hidden) return

    clientX = newIndex * SCREEN_WIDTH
    transitionTiming = Math.abs((newIndex - index)) * 100

    setIndex(newIndex)
    setTransformInAF(-clientX)

    if (onIndexChange && newIndex !== index) onIndexChange(newIndex)
  }

  return (
    <>
      <div
        className="cardList"
        style={{
          width: `${LIST_WIDTH}px`,
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
            <Card hidden={index === idx && hidden} key={`card-${idx}`} value={card.value} image={card.image} />
          ))
        }
      </div>
      <Pagination
        hidden={hidden}
        cards={CARDS}
        onIndexChange={handleIndexChange}
        activeIndex={index}
      />
    </>
  )
}

export default CardList