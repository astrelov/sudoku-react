import React from 'react'
import { Button } from '../../../Button'
import { Image } from '../../../Image'
import { GameClock } from '../../../GameClock'

export const ControlBar = ({ isPencil, confirming, gameTime, handlers }) => {
  const { handleNGConfirm, handleRSConfirm, handlePencilChange, handleUndo, handleRedo } = handlers

  return (
    <div id="control-bar" className="game-bar">
      <GameClock classNames={['control-btn', 'game-bar-btn']} time={gameTime} />

      <Button
        classNames={['control-btn', 'game-bar-btn']}
        isSelected={confirming === 'confirmNG'}
        handleClick={handleNGConfirm}
      >
        <Image src="./src/resources/img/controls/new_game_c8c8c8.png" classNames={['no-events']} />
      </Button>

      <Button
        classNames={['control-btn', 'game-bar-btn']}
        isSelected={confirming === 'confirmRS'}
        handleClick={handleRSConfirm}
      >
        <Image src="./src/resources/img/controls/restart_c8c8c8.png" classNames={['no-events']} />
      </Button>

      <Button
        classNames={['control-btn', 'game-bar-btn']}
        isSelected={isPencil}
        handleClick={handlePencilChange}
      >
        <Image src="./src/resources/img/controls/pencil_c8c8c8.png" classNames={['no-events']} />
      </Button>

      <Button classNames={['control-btn', 'game-bar-btn']} handleClick={handleUndo}>
        <Image src="./src/resources/img/controls/undo_c8c8c8.png" classNames={['no-events']} />
      </Button>

      <Button classNames={['control-btn', 'game-bar-btn']} handleClick={handleRedo}>
        <Image src="./src/resources/img/controls/redo_c8c8c8.png" classNames={['no-events']} />
      </Button>
    </div>
  )
}
