import React from 'react';
import {selected, noEvents} from '../../../../../index.module.css';
import style from './index.module.css';
import {Button} from '../../../Button/index';
import {Image} from '../../../Image/index';
import {GameClock} from './GameClock/index';
import {Text} from '../../../Text';
import {Bars} from '../../../Game/index'

export const ControlBar = ({isPencil, currentBar, canUndo, canRedo, gameTime, handlers}) => {
  const {handleNGConfirm, handleRSConfirm, handlePencilChange, handleUndo, handleRedo} = handlers;

  return (
    <div className={style.component}>
      <GameClock classNames={[style.btn]} time={gameTime}/>

      <Button
        classNames={[style.btn]}
        isSelected={currentBar === Bars.CONFIRM_NG}
        handleClick={({target}) => handleNGConfirm(target.classList.contains(selected))}
      >
        <Text classNames={[noEvents]}>New Game</Text>
      </Button>

      <Button
        classNames={[style.btn]}
        isSelected={currentBar === Bars.CONFIRM_RS}
        handleClick={({target}) => handleRSConfirm(target.classList.contains(selected))}
      >
        <Image src="/img/controls/restart.svg" classNames={[noEvents]}/>
      </Button>

      <Button
        classNames={[style.btn]}
        isSelected={isPencil}
        handleClick={handlePencilChange}
      >
        <Image src="/img/controls/pencil.svg" classNames={[noEvents]}/>
      </Button>

      <Button classNames={[style.btn]} disabled={!canUndo} handleClick={handleUndo}>
        <Image src="/img/controls/undo.svg" classNames={[noEvents]}/>
      </Button>

      <Button classNames={[style.btn]} disabled={!canRedo} handleClick={handleRedo}>
        <Image src="/img/controls/redo.svg" classNames={[noEvents]}/>
      </Button>
    </div>
  );
};
