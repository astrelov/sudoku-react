import React from 'react'
import { WinBar } from './WinBar/WinBar'
import { NbrBar } from './NbrBar/NbrBar'
import { ConfirmNGBar } from './ConfirmNGBar/ConfirmNGBar'
import { ConfirmRSBar } from './ConfirmRSBar/ConfirmRSBar'

export const CurrentBar = ({
  nbrsAmount,
  selectedNbr,
  gameTime,
  currentBarName,
  difficultyNames,
  difficulty,
  handlers,
}) => {
  let currentBar

  if (currentBarName === 'nbr') {
    currentBar = <NbrBar nbrsAmount={nbrsAmount} selectedNbr={selectedNbr} handlers={handlers} />
  }
  if (currentBarName === 'win') {
    currentBar = <WinBar difficulty={difficultyNames[difficulty]} gameTime={gameTime} />
  }
  if (currentBarName === 'confirmNG') {
    currentBar = <ConfirmNGBar handlers={handlers} difficultyNames={difficultyNames}/>
  }
  if (currentBarName === 'confirmRS') {
    currentBar = <ConfirmRSBar handlers={handlers} />
  }

  return currentBar
}
