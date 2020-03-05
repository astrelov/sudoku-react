import React from 'react';
import {selected, noEvents} from '../../../../App/index.module.css';
import {bar, btn} from '../../Bars/index.module.css'
import style from './index.module.css';
import {Button} from '../../../../Button';
import {Image} from '../../../../Image';
import {GameClock} from './GameClock';
import {Text} from '../../../../Text';
import {Bars} from '../../../Game'

export const ControlBar = ({isPencil, currentBar, canUndo, canRedo, gameTime, handlers}) => {
  const {handleNGConfirm, handleRSConfirm, handlePencilChange, handleUndo, handleRedo} = handlers;

  return (
    <div className={[style.component, bar].join(' ')}>
      <GameClock classNames={[btn]} time={gameTime}/>

      <Button
        classNames={[btn]}
        isSelected={currentBar === Bars.CONFIRM_NG}
        handleClick={({target}) => handleNGConfirm(target.classList.contains(selected))}
      >
        <Text classNames={[noEvents]}>New Game</Text>
      </Button>

      <Button
        classNames={[btn]}
        isSelected={currentBar === Bars.CONFIRM_RS}
        handleClick={({target}) => handleRSConfirm(target.classList.contains(selected))}
      >
        <Image src="/img/controls/restart.svg" classNames={[noEvents]}/>
      </Button>

      <Button
        classNames={[btn]}
        isSelected={isPencil}
        handleClick={handlePencilChange}
      >
        <Image src="/img/controls/pencil.svg" classNames={[noEvents]}/>
      </Button>

      <Button classNames={[btn]} disabled={!canUndo} handleClick={handleUndo}>
        <Image src="/img/controls/undo.svg" classNames={[noEvents]}/>
      </Button>

      <Button classNames={[btn]} disabled={!canRedo} handleClick={handleRedo}>
        <Image src="/img/controls/redo.svg" classNames={[noEvents]}/>
      </Button>
    </div>
  );
};
