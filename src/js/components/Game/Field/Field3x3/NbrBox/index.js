import React from 'react';
import {noEvents} from '../../../../../../index.module.css'
import style from './index.module.css';
import {NbrWrapper} from './NbrWrapper';

export const NbrBox = ({x, y, fieldModel, initialFieldModel, selectedNbr, handlers}) => {
  const {handleInput} = handlers;
  const boxClasses = [style.component];
  const isInitial = initialFieldModel[x][y];
  
  isInitial && boxClasses.push(noEvents);

  return (
    <div className={boxClasses.join(' ')} onClick={() => handleInput(x, y)}>
      <NbrWrapper
        x={x}
        y={y}
        fieldModel={fieldModel}
        isInitial={isInitial}
        selectedNbr={selectedNbr}
      />
    </div>
  );
};
