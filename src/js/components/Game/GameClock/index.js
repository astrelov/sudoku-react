import React from 'react';
import {Button} from '../../Button';
import {Text} from '../../Text';

export const GameClock = ({classNames = [], time = 0}) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  let timeStr = '';

  if (minutes) timeStr += minutes + 'm';
  if (minutes && seconds) timeStr += ' ';
  if (seconds || !minutes) timeStr += seconds + 's';

  return (
    <Button classNames={classNames}>
      <Text>{timeStr}</Text>
    </Button>
  );
};
