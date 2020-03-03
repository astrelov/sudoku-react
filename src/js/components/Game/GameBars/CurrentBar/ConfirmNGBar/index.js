import React from 'react';
import {Button} from '../../../../Button/index';
import style from './index.module.css';
import {Text} from '../../../../Text';

export const ConfirmNGBar = ({handlers, difficultyNames}) => {
  let {handleNG, handleNGReject} = handlers;
  let buttons = [];

  for (let dfclty = 0; dfclty < 5; dfclty++) {
    buttons.push(
      <Button
        key={dfclty.toString()}
        classNames={['confirm-btn', 'game-bar-btn']}
        handleClick={e => handleNG(dfclty, e)}
      >
        <Text classNames={['no-events']}>{difficultyNames[dfclty]}</Text>
      </Button>
    );
  }

  buttons.push(
    <Button key={'5'} classNames={['confirm-btn', 'game-bar-btn']} handleClick={handleNGReject}>
      <Text classNames={['no-events']}>X</Text>
    </Button>
  );

  return (
    <div className={style.component}>
      {buttons}
    </div>
  );
};
