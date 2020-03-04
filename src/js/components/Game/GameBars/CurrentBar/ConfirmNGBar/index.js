import React from 'react';
import {noEvents} from '../../../../../../index.module.css'
import style from './index.module.css';
import {Button} from '../../../../Button/index';
import {Image} from '../../../../Image/index';
import {Text} from '../../../../Text';

export const ConfirmNGBar = ({handlers, difficultyNames}) => {
  let {handleNG, handleNGReject} = handlers;
  let buttons = [];

  for (let difficulty = 0; difficulty < 5; difficulty++) {
    buttons.push(
      <Button
        classNames={[style.btn]}
        handleClick={e => handleNG(difficulty, e)}
        key={difficulty.toString()}
      >
        <Text classNames={[noEvents]}>{difficultyNames[difficulty]}</Text>
      </Button>
    );
  }

  buttons.push(
    <Button classNames={[style.btn]} handleClick={handleNGReject} key={'5'}>
      <Image src={'img/controls/cancel.svg'} classNames={[noEvents, style.btnImg]}/>
    </Button>
  );

  return (
    <div className={style.component}>
      {buttons}
    </div>
  );
};
