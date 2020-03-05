import React from 'react';
import {WinBar} from './WinBar';
import {NbrBar} from './NbrBar';
import {ConfirmNGBar} from './ConfirmNGBar';
import {ConfirmRSBar} from './ConfirmRSBar';
import {Bars} from '../../../Game'

export const CurrentBar = ({
                             nbrsAmount,
                             selectedNbr,
                             gameTime,
                             currentBar,
                             difficultyNames,
                             difficulty,
                             handlers,
                           }) => {
  let bar;

  if (currentBar === Bars.NBR) {
    bar = <NbrBar nbrsAmount={nbrsAmount} selectedNbr={selectedNbr} handlers={handlers}/>;
  }
  if (currentBar === Bars.WIN) {
    bar = <WinBar difficulty={difficultyNames[difficulty]} gameTime={gameTime}/>;
  }
  if (currentBar === Bars.CONFIRM_NG) {
    bar = <ConfirmNGBar handlers={handlers} difficultyNames={difficultyNames}/>;
  }
  if (currentBar === Bars.CONFIRM_RS) {
    bar = <ConfirmRSBar handlers={handlers}/>;
  }

  return bar;
};
