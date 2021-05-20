import { createStore } from "redux"
import { SPEED_RATE } from "../constants/app.constant"

import { ACTION_CONTINUE, ACTION_PAUSE, ACTION_GAME_OVER, ACTION_EAT_FOOD, ACTION_TURBO_SNEK, ACTION_SLOW_SNEK, ACTION_START_NEW_GAME } from "./gameAction"

const initState = {
  isPause: false,
  isGameOver: false,
  mapWidth: 40,
  mapHeight: 40,
  speed: 100,
  turbo: false,
  point: 0,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_PAUSE:
      return { ...state, isPause: true }
    case ACTION_CONTINUE:
      return { ...state, isPause: false }
    case ACTION_GAME_OVER:
      return { ...state, isGameOver: true }
    case ACTION_EAT_FOOD:
      let cloneState = { ...state }

      if (++cloneState.point % 10 == 0) {
        cloneState.speed /= SPEED_RATE
        console.log("speed increase")
      }

      return cloneState
    case ACTION_TURBO_SNEK:
      return { ...state, turbo: action.payload }
    case ACTION_START_NEW_GAME:
      return {
          ...state,
          speed: 100,
          point: 0,
          isGameOver: false,
          turbo: false
      }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
