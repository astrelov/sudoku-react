import React from 'react';
import style from './index.module.css';
import {Text} from '../../../../Text';

export const WinBar = ({gameTime, difficulty}) => {
  const minutes = Math.floor(gameTime / 60);
  const seconds = gameTime % 60;
  let timeStr = '';

  if (minutes) timeStr += minutes + 'm';
  if (minutes && seconds) timeStr += ' ';
  if (seconds) timeStr += seconds + 's';

  return (
    <div className={style.component}>
      <Text>
        Win! Difficulty: {difficulty}, time: {timeStr}!
      </Text>
    </div>
  );
};
