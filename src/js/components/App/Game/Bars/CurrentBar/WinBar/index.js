import React from 'react';
import { bar } from '../../../Bars/index.module.css'
import {text} from '../../../../../App/index.module.css'
import style from './index.module.css';

export const WinBar = ({gameTime, difficulty}) => {
  const minutes = Math.floor(gameTime / 60);
  const seconds = gameTime % 60;
  let timeStr = '';

  if (minutes) timeStr += minutes + 'm';
  if (minutes && seconds) timeStr += ' ';
  if (seconds) timeStr += seconds + 's';

  return (
    <div className={[style.component, bar].join(' ')}>
      <div className={text}>
        Win! Difficulty: {difficulty}, time: {timeStr}!
      </div>
    </div>
  );
};
