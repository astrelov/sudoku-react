import React from 'react';
import style from './index.module.css'

export const Button = ({classNames = [], isSelected, disabled, children, handleClick = null}) => {
  const classes = classNames;

  isSelected && classes.push('selected');
  disabled && classes.push(style.disabled);

  return (
    <button className={classes.join(' ')} onClick={handleClick}>
      {children}
    </button>
  );
};
