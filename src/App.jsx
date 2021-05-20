import React, { useState } from "react"
import "./assets/main.scss"
import Scene from "./components/Scene"
import { Provider, useSelector } from 'react-redux'
import Score from "./components/Score"
import store from './store/gameStore'

const App = () => {
  document.title = process.env.APP_TITLE

  return (
    <Provider store={store}>
      <div id="mainApp">
        <h1 style={{ textAlign: "center", margin: "20px auto" }}>Snek</h1>
        <Score/>
        <Scene/>
        <h6 style={{ textAlign: "center", margin: "10px auto" }}>Use <i>Arrow</i> to "drive" Snek </h6>
        <h6 style={{ textAlign: "center", margin: "10px auto" }}>Hold <span><i>SPACE BAR</i></span> to feed Snek cocaine </h6>
      </div>
    </Provider>
  )
}

export default App
