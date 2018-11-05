import CARDS from './Cards'

export const SCREEN_WIDTH = window.innerWidth
export const LIST_WIDTH = CARDS.length * SCREEN_WIDTH
export const MAX_TRANSFORM = -(CARDS.length - 1) * SCREEN_WIDTH
export const INDEX_CHANGE_THRESHOLD = 0.5 // relative to the screen width
export const DEFAULT_TRANSITION_TIMING = 0
export const MULTIPLE_CARDS_TRANSITION_TIMING = 100
export const ONE_CARD_TRANSITION_TIMING = 200
export const FAST_SWIPE_THRESHOLD = 150 // ms