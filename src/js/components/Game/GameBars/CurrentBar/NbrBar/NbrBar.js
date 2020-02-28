import React from 'react'
import { Button } from '../../../../Button'
import { Image } from '../../../../Image'

export const NbrBar = ({ nbrsAmount, selectedNbr, handlers }) => {
  let { handleSelectNbr } = handlers
  let buttons = []

  for (let nbr = 1; nbr <= 9; nbr++) {
    const btnClasses = ['nbr-btn', 'game-bar-btn']
    const nbrAmountToFill = 9 - nbrsAmount[nbr]
    let cntrImgSrc =
      nbrAmountToFill < 0
        ? `./src/resources/img/red.png`
        : `./src/resources/img/numbers/${nbrAmountToFill}_c8c8c8.png`

    selectedNbr === nbr && btnClasses.push('selected')

    buttons.push(
      <Button
        key={nbr.toString()}
        classNames={btnClasses}
        handleClick={e => handleSelectNbr(nbr, e)}
      >
        <Image
          src={`./src/resources/img/numbers/${nbr}_c8c8c8.png`}
          classNames={['no-events', 'nbr-slct']}
        ></Image>
        <Image src={cntrImgSrc} classNames={['no-events', 'nbr-cntr']}></Image>
      </Button>
    )
  }

  return (
    <div id="nbr-bar" className="game-bar">
      {buttons}
    </div>
  )
}
