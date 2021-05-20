import React from "react"
import { useSelector } from "react-redux"

const Score = () => {
  const point = useSelector((state) => state.point)
  const isGameOver = useSelector(state => state.isGameOver)
  return (
      <React.Fragment>
            <h1 style={{ textAlign: "center", margin: "20px auto" }}>Score: {point} </h1>
            <h3 style={{ textAlign: "center", margin: "10px auto", visibility: `${isGameOver ? 'visible' : 'hidden'}` }}>Game over. Press ENTER to start a new game</h3>
      </React.Fragment>
  )
}

export default Score
