import React from 'react';
import {selected} from '../../../../../App/index.module.css'
import {bar, btn} from '../../../Bars/index.module.css'
import style from './index.module.css';
import {Button} from '../../../../../Button';
import {Text} from '../../../../../Text';

export const NbrBar = ({nbrsAmount, selectedNbr, handlers}) => {
  let {handleSelectNbr} = handlers;
  let buttons = [];

  for (let nbr = 1; nbr <= 9; nbr++) {
    const nbrAmountToFill = (9 - nbrsAmount[nbr]) < 0 ? '+' + (nbrsAmount[nbr] - 9) : (9 - nbrsAmount[nbr]) || '';
    const classes = [style.btn, btn];

    selectedNbr === nbr && classes.push(selected);

    buttons.push(
      <Button
        classNames={classes}
        handleClick={e => handleSelectNbr(nbr, e)}
        key={nbr.toString()}
      >
        <Text classNames={[style.nbr]}>{nbr}</Text>
        <Text classNames={[style.nbrAmount]}>{nbrAmountToFill}</Text>
      </Button>
    );
  }

  return (
    <div className={[style.component, bar].join(' ')}>
      {buttons}
    </div>
  );
};
