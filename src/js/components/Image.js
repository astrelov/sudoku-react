import React from 'react'

export const Image = ({ src, classNames = [] }) => {
  return <img src={src} className={classNames.join(' ')}></img>
}
