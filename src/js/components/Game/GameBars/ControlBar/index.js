import React from 'react';
import {Button} from '../../../Button/index';
import {Image} from '../../../Image/index';
import {GameClock} from '../../GameClock/index';
import style from './index.module.css';
import {Text} from '../../../Text';

export const ControlBar = ({isPencil, confirming, canUndo, canRedo, gameTime, handlers}) => {
  const {handleNGConfirm, handleRSConfirm, handlePencilChange, handleUndo, handleRedo} = handlers;

  return (
    <div className={style.component}>
      <GameClock classNames={['control-btn', 'game-bar-btn']} time={gameTime}/>

      <Button
        classNames={['control-btn', 'game-bar-btn']}
        isSelected={confirming === 'confirmNG'}
        handleClick={handleNGConfirm}
      >
        <Text classNames={['no-events']}>New Game</Text>
      </Button>

      <Button
        classNames={['control-btn', 'game-bar-btn']}
        isSelected={confirming === 'confirmRS'}
        handleClick={handleRSConfirm}
      >
        <Image src="/img/controls/restart.svg" classNames={['no-events']}/>
      </Button>

      <Button
        classNames={['control-btn', 'game-bar-btn']}
        isSelected={isPencil}
        handleClick={handlePencilChange}
      >
        <Image src="/img/controls/pencil.svg" classNames={['no-events']}/>
      </Button>

      <Button classNames={['control-btn', 'game-bar-btn', canUndo ? '' : 'disabled']} handleClick={handleUndo}>
        <Image src="/img/controls/undo.svg" classNames={['no-events']}/>
      </Button>

      <Button classNames={['control-btn', 'game-bar-btn', canRedo ? '' : 'disabled']} handleClick={handleRedo}>
        <Image src="/img/controls/redo.svg" classNames={['no-events']}/>
      </Button>
    </div>
  );
};
