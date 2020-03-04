import React from 'react';
import {selected} from '../../../../../../../index.module.css'
import style from './index.module.css';
import {Text} from '../../../../../Text';

export const NbrWrapper = ({x, y, fieldModel, initialFieldModel, selectedNbr}) => {
  function getWrapperClasses(value) {
    const classes = [];
    const isInitial = initialFieldModel[x][y];

    isInitial && classes.push(style.initialWrapper);

    selectedNbr &&
    (value === selectedNbr || (Array.isArray(value) && value.includes(selectedNbr))) &&
    classes.push(selected);

    return classes;
  }

  function getNbr(value) {
    const classes = [style.nbrVal];
    const isInitial = initialFieldModel[x][y];

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
  const wrapperClasses = getWrapperClasses(value, selectedNbr);
  let nbrs;

  if (isPencil) {
    nbrs = getPnclNbrs(value);
  } else {
    nbrs = getNbr(value);
  }

  return <div className={style.component + ' ' + wrapperClasses.join(' ')}>{nbrs}</div>;
};
