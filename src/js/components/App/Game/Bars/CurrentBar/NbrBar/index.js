import React from 'react';
import {selected, text} from '../../../../../App/index.module.css'
import {bar, btn} from '../../../Bars/index.module.css'
import style from './index.module.css';

export const NbrBar = ({nbrsAmount, selectedNbr, handlers}) => {
  const {handleSelectNbr} = handlers;
  let buttons = [];

  for (let nbr = 1; nbr <= 9; nbr++) {
    const nbrAmountToFill = (9 - nbrsAmount[nbr]) < 0 ? '+' + (nbrsAmount[nbr] - 9) : (9 - nbrsAmount[nbr]) || '';
    const classes = [style.btn, btn];

    selectedNbr === nbr && classes.push(selected);

    buttons.push(
      <button
        className={classes.join(' ')}
        onClick={e => handleSelectNbr(nbr, e)} // TODO remove this event pass
        key={nbr.toString()}
      >
        <div className={[style.nbr, text].join(' ')}>{nbr}</div>
        <div className={[style.nbrAmount, text].join(' ')}>{nbrAmountToFill}</div>
      </button>
    );
  }

  return (
    <div className={[style.component, bar].join(' ')}>
      {buttons}
    </div>
  );
};
