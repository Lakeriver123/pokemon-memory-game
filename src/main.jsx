import React from 'react'
import ReactDOM from 'react-dom/client'
import GenerateGameBoard from './components/gameboard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="container">
      <img src="./public/images/pokemon-logo.jpg" alt="pokemon-logo" />
      <h1>Memory Game</h1>
      <p><b>Don't pick the same Pokemon twice!</b></p>
      <GenerateGameBoard />
    </div>
  </React.StrictMode>,
)
