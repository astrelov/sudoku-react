import React from 'react';
import {noEvents} from '../../../../../../index.module.css'
import style from './index.module.css';
import {NbrWrapper} from './NbrWrapper';

export const NbrBox = ({x, y, fieldModel, initialFieldModel, selectedNbr, handlers}) => {
  const {handleInput} = handlers;
  const boxClasses = [style.component];

  initialFieldModel[x][y] && boxClasses.push(noEvents);

  return (
    <div className={boxClasses.join(' ')} onClick={() => handleInput(x, y)}>
      <NbrWrapper
        x={x}
        y={y}
        fieldModel={fieldModel}
        initialFieldModel={initialFieldModel}
        selectedNbr={selectedNbr}
      />
    </div>
  );
};
