import React from 'react'
import { Button } from '../../../../Button'
import { Image } from '../../../../Image'

export const ConfirmNGBar = ({ handlers, difficultyNames }) => {
  let { handleNG, handleNGReject } = handlers
  let buttons = []

  for (let dfclty = 0; dfclty < 5; dfclty++) {
    buttons.push(
      <Button
        key={dfclty.toString()}
        classNames={['confirm-btn', 'game-bar-btn']}
        handleClick={e => handleNG(dfclty, e)}
      >
        <Image
          src={`./src/resources/img/controls/${difficultyNames[dfclty]}_c8c8c8.png`}
          classNames={['no-events']}
        ></Image>
      </Button>
    )
  }

  buttons.push(
    <Button key={'5'} classNames={['confirm-btn', 'game-bar-btn']} handleClick={handleNGReject}>
      <Image
        src={`./src/resources/img/controls/cancel_c8c8c8.png`}
        classNames={['no-events']}
      ></Image>
    </Button>
  )

  return (
    <div id="confirm-ng-bar" className="game-bar">
      {buttons}
    </div>
  )
}
