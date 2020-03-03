import React from 'react';
import {Button} from '../../../../Button/index';
import style from './index.module.css';
import {Text} from '../../../../Text';

export const NbrBar = ({nbrsAmount, selectedNbr, handlers}) => {
  let {handleSelectNbr} = handlers;
  let buttons = [];

  for (let nbr = 1; nbr <= 9; nbr++) {
    const nbrAmountToFill = (9 - nbrsAmount[nbr]) < 0 ? '+' + (nbrsAmount[nbr] - 9) : (9 - nbrsAmount[nbr]);

    const btnClasses = [style.button];
    selectedNbr === nbr && btnClasses.push('selected');

    buttons.push(
      <Button
        key={nbr.toString()}
        classNames={btnClasses}
        handleClick={e => handleSelectNbr(nbr, e)}
      >
        <Text classNames={[style.nbr]}>{nbr}</Text>
        <Text classNames={[style.pnclNbr]}>{nbrAmountToFill ? nbrAmountToFill : ''}</Text>
      </Button>
    );
  }

  return (
    <div className={style.component}>
      {buttons}
    </div>
  );
};
