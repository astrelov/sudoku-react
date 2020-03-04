import React from 'react';

export const Image = ({src, classNames = [], alt = ''}) => {
  return <img alt={alt} src={src} className={classNames.join(' ')}/>;
};
