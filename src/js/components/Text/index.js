import React from 'react';
import style from './index.module.css';

export const Text = ({children, classNames = []}) => {
  return (<div className={style.component + ' ' + classNames.join(' ')}>{children}</div>);
};
