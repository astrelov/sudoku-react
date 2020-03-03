import React from 'react';

export const Image = ({src, classNames = []}) => {
  return <img alt="" src={src} className={classNames.join(' ')}/>;
};
