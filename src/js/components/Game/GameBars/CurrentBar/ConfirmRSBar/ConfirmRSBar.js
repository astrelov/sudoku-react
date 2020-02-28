import React from 'react'
import { Button } from '../../../../Button'
import { Image } from '../../../../Image'

export const ConfirmRSBar = ({ handlers }) => {
  const { handleRS, handleRSReject } = handlers

  return (
    <div id="confirm-rs-bar" className="game-bar">
      <Button classNames={['confirm-btn', 'game-bar-btn']} handleClick={handleRS}>
        <Image src={'./src/resources/img/controls/confirm_c8c8c8.png'} classNames={['no-events']} />
      </Button>
      <Button classNames={['confirm-btn', 'game-bar-btn']} handleClick={handleRSReject}>
        <Image src={'./src/resources/img/controls/cancel_c8c8c8.png'} classNames={['no-events']} />
      </Button>
    </div>
  )
}
