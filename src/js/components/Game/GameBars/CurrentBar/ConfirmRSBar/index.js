import React from 'react';
import {Button} from '../../../../Button/index';
import {Image} from '../../../../Image/index';
import style from './index.module.css';

export const ConfirmRSBar = ({handlers}) => {
  const {handleRS, handleRSReject} = handlers;

  return (
    <div className={style.component}>
      <Button classNames={['confirm-btn', 'game-bar-btn']} handleClick={handleRS}>
        <Image src={'img/controls/confirm.svg'} classNames={['no-events']}/>
      </Button>
      <Button classNames={['confirm-btn', 'game-bar-btn']} handleClick={handleRSReject}>
        <Image src={'img/controls/cancel.svg'} classNames={['no-events']}/>
      </Button>
    </div>
  );
};
