import React from 'react';
import {selected, text} from '../../../../../../App/index.module.css'
import style from './index.module.css';

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

    return <div
      className={classes.join(' ')}>{value}</div>;
  }

  function getPnclNbrs(value) {
    const nbrs = [];

    value.forEach(nbr => {
      nbrs.push(<div className={[style.pnclVal, text].join(' ')} key={nbr.toString()}>{nbr}</div>);
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
