import React from 'react'

// time in seconds
export const WinBar = ({ gameTime, difficulty }) => {
  const minutes = Math.floor(gameTime / 60)
  const seconds = gameTime % 60
  let timeStr = ''

  if (minutes) timeStr += minutes + 'm'
  if (minutes && seconds) timeStr += ' '
  if (seconds) timeStr += seconds + 's'

  return (
    <div id="win-bar">
      <p id="win-text">
        Win! Difficulty: {difficulty}, time: {timeStr}!
      </p>
    </div>
  )
}
