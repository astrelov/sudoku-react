import React from 'react';

export const Button = ({classNames = [], isSelected, children, handleClick = null}) => {
  const classes = classNames.join(' ') + (isSelected ? ' selected' : '');

  return (
    <button className={classes} onClick={handleClick}>
      {children}
    </button>
  );
};
