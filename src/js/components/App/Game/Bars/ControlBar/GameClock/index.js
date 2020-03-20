import React from 'react';
import {text} from '../../../../../App/index.module.css';

export const GameClock = ({classNames = [], time = 0}) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  let timeStr = '';

  if (minutes) {
    timeStr += minutes + 'm';
  }
  if (minutes && seconds) {
    timeStr += ' ';
  }
  if (seconds || !minutes) {
    timeStr += seconds + 's';
  }

  return (
      <button className={classNames.join(' ')}>
        <div className={text}>{timeStr}</div>
      </button>
  );
};
