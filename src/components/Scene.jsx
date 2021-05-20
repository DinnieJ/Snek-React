import React, { useState, useEffect } from "react"

import Snek from "./Snek"
import Meat from "./Meat"
import { PIXEL_SIZE, KEY, DIRECTION } from "../constants/app.constant"
import { useInterval } from "../utils/useInterval"
import initSnek from "../utils/initSnake"
import { connect, useDispatch } from "react-redux"
import { generateMeatPosition } from "../utils/food"
import { sendAction } from "../utils/sendAction"
import { ACTION_EAT_FOOD, ACTION_GAME_OVER, ACTION_START_NEW_GAME, ACTION_TURBO_SNEK } from "../store/gameAction"

const Scene = (props) => {
  const [snekPoints, setSnekPoints] = useState(initSnek({ x: 20, y: 3 }, 3, DIRECTION.RIGHT))

  const [direction, setDirection] = useState(DIRECTION.RIGHT)

  const [meatPosition, setMeatPosition] = useState(generateMeatPosition(props.width, props.height))

  const dispatch = useDispatch()

  let sceneSize = () => ({
    width: props.width * PIXEL_SIZE,
    height: props.height * PIXEL_SIZE,
  })

  const setupController = () => {
    document.onkeydown = (e) => {
      e = e || window.event
      if (!props.isGameOver) {
        switch (e.keyCode) {
          case KEY.UP:
            if (![DIRECTION.DOWN].includes(direction)) {
              setDirection(DIRECTION.UP)
            }
            break
          case KEY.DOWN:
            if (![DIRECTION.UP].includes(direction)) {
              setDirection(DIRECTION.DOWN)
            }
            break
          case KEY.LEFT:
            if (![DIRECTION.RIGHT].includes(direction)) {
              setDirection(DIRECTION.LEFT)
            }
            break
          case KEY.RIGHT:
            if (![DIRECTION.LEFT].includes(direction)) {
              setDirection(DIRECTION.RIGHT)
            }
            break
          case KEY.SPACE_BAR:
            dispatch(sendAction(ACTION_TURBO_SNEK, true))
            break
        }
      }

      if(e.keyCode === KEY.ENTER && props.isGameOver) {
        restartGame()
      }
    }

    document.onkeyup = (e) => {
      e = e || window.event

      if( !props.isGameOver ) {
        switch (e.keyCode) {
          case KEY.SPACE_BAR:
            dispatch(sendAction(ACTION_TURBO_SNEK, false))
            break
        }
      }
    }
  }

  let snekMove = () => {
    if (!props.isGameOver) {
      let points = [...snekPoints]

      let head = points[points.length - 1]

      switch (direction) {
        case DIRECTION.UP:
          head = { x: head.x, y: head.y - 1 }
          break
        case DIRECTION.DOWN:
          head = { x: head.x, y: head.y + 1 }
          break
        case DIRECTION.LEFT:
          head = { x: head.x - 1, y: head.y }
          break
        case DIRECTION.RIGHT:
          head = { x: head.x + 1, y: head.y }
          break
      }

      points.push(head)
      points.shift()

      if (head.x == meatPosition.x && head.y == meatPosition.y) {
        points.unshift({})
        setMeatPosition(generateMeatPosition(props.width, props.height))
        dispatch(sendAction(ACTION_EAT_FOOD))
      }
      if (checkImpact(head) || isSnekStupid(head, points)) {
        dispatch(sendAction(ACTION_GAME_OVER))
      } else {
        setSnekPoints(points)
      }
    }
  }

  const checkImpact = (head) => {
    return head.x < 0 || head.x >= props.width || head.y < 0 || head.y >= props.height
  }

  const isSnekStupid = (head, points) => {
    let pointsCopy = [...points]
    pointsCopy.pop()

    if (pointsCopy.find((item) => item.x === head.x && item.y === head.y)) {
      console.log(pointsCopy, head)
      return true
    }

    return false
  }

  const getSpeed = () => {
    return props.turbo ? props.speed / 2 : props.speed
  }

  const restartGame = () => {
    setMeatPosition(generateMeatPosition(props.width, props.height))
    setSnekPoints(initSnek())
    setDirection(DIRECTION.RIGHT)
    dispatch(sendAction(ACTION_START_NEW_GAME))
  }

  const construct = () => {
    setupController()
  }
  useState(construct())

  useInterval(() => {
    snekMove()
  }, getSpeed())

  return (
    <div className={`scene ${props.isGameOver ? "scene--game-over" : ""}`} style={sceneSize()}>
      <Snek snekDot={snekPoints}></Snek>
      <Meat pos={meatPosition} />
    </div>
  )
}

const mapStatesToProps = (state) => {
  return {
    width: state.mapWidth,
    height: state.mapHeight,
    isGameOver: state.isGameOver,
    speed: state.speed,
    turbo: state.turbo,
  }
}
export default connect(mapStatesToProps)(Scene)
