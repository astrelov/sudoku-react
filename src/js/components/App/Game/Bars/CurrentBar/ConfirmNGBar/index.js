import React from 'react';
import {noEvents, text} from '../../../../../App/index.module.css'
import {bar, btn} from '../../../Bars/index.module.css'
import style from './index.module.css';

export const ConfirmNGBar = ({handlers, difficultyNames}) => {
  const { handleNG, handleNGReject } = handlers;
  const btnClasses = [style.btn, btn].join(' ');
  let buttons = [];

  for (let difficulty = 0; difficulty < 5; difficulty++) {
    buttons.push(
      <button
        className={btnClasses}
        onClick={e => handleNG(difficulty, e)}
        key={difficulty.toString()}
      >
        <div className={text}>{difficultyNames[difficulty]}</div>
      </button>
    );
  }

  buttons.push(
    <button className={btnClasses} onClick={handleNGReject} key={'5'}>
      <svg className={[noEvents, style.btnImg].join(' ')}><use xlinkHref="./index.svg#cancel"/></svg>
    </button>
  );

  return (
    <div className={[style.component, bar].join(' ')}>
      {buttons}
    </div>
  );
};
