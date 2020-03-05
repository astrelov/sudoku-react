import React from 'react';
import {noEvents} from '../../../../../App/index.module.css'
import style from './index.module.css';
import {Button} from '../../../../../Button';
import {Image} from '../../../../../Image';

export const ConfirmRSBar = ({handlers}) => {
  const {handleRS, handleRSReject} = handlers;

  return (
    <div className={style.component}>
      <Button classNames={[style.btn]} handleClick={handleRS}>
        <Image src={'img/controls/confirm.svg'} classNames={[noEvents, style.btnImg]}/>
      </Button>
      <Button classNames={[style.btn]} handleClick={handleRSReject}>
        <Image src={'img/controls/cancel.svg'} classNames={[noEvents, style.btnImg]}/>
      </Button>
    </div>
  );
};
