import React from 'react';
import {selected} from '../../../../../../../index.module.css'
import style from './index.module.css';
import {Text} from '../../../../../Text';

export const NbrWrapper = ({x, y, fieldModel, isInitial, selectedNbr}) => {
  function getWrapperClasses(value, selectedNbr, isInitial) {
    const classes = [];
    const isSelected = selectedNbr &&
      ((value === selectedNbr) || (Array.isArray(value) && value.includes(selectedNbr)));
    
    isSelected && classes.push(selected);
    isInitial && classes.push(style.initialWrapper);

    return classes;
  }

  function getNbr(value, isInitial) {
    const classes = [style.nbrVal];

    isInitial && classes.push(style.initialNbr);

    return <Text
      classNames={classes}>{value}</Text>;
  }

  function getPnclNbrs(value) {
    const nbrs = [];

    value.forEach(nbr => {
      nbrs.push(<Text classNames={[style.pnclVal]} key={nbr.toString()}>{nbr}</Text>);
    });

    return nbrs;
  }

  const value = fieldModel[x][y] || '';
  const isPencil = Array.isArray(value);
  const wrapperClasses = getWrapperClasses(value, selectedNbr, isInitial);
  let nbrs;

  if (isPencil) {
    nbrs = getPnclNbrs(value);
  } else {
    nbrs = getNbr(value, isInitial);
  }

  return <div className={style.component + ' ' + wrapperClasses.join(' ')}>{nbrs}</div>;
};
