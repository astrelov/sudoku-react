import React from 'react';
import {noEvents} from '../../../../../../index.module.css'
import style from './index.module.css';
import {Button} from '../../../../Button/index';
import {Image} from '../../../../Image/index';
import {Text} from '../../../../Text';

export const ConfirmNGBar = ({handlers, difficultyNames}) => {
  let {handleNG, handleNGReject} = handlers;
  let buttons = [];

  for (let dfclty = 0; dfclty < 5; dfclty++) {
    buttons.push(
      <Button
        key={dfclty.toString()}
        classNames={[style.btn]}
        handleClick={e => handleNG(dfclty, e)}
      >
        <Text classNames={[noEvents]}>{difficultyNames[dfclty]}</Text>
      </Button>
    );
  }

  buttons.push(
    <Button key={'5'} classNames={[style.btn]} handleClick={handleNGReject}>
      <Image src={'img/controls/cancel.svg'} classNames={[noEvents, style.btnImg]}/>
    </Button>
  );

  return (
    <div className={style.component}>
      {buttons}
    </div>
  );
};
