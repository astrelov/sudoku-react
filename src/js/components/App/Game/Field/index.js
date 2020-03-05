import React from 'react';
import {noEvents} from '../../../App/index.module.css'
import style from './index.module.css';
import {Field3x3} from './Field3x3';

export const Field = ({fieldModel, initialFieldModel, selectedNbr, isWin, handlers}) => {
  const fields3x3 = [];
  const fieldClasses = [style.component];
  
  isWin && fieldClasses.push(noEvents);

  for (let y3 = 0; y3 < 9; y3 += 3) {
    for (let x3 = 0; x3 < 9; x3 += 3) {
      fields3x3.push(
        <Field3x3
          x3={x3}
          y3={y3}
          fieldModel={fieldModel}
          initialFieldModel={initialFieldModel}
          selectedNbr={selectedNbr}
          handlers={handlers}
          key={`${x3}${y3}`}
        />
      );
    }
  }

  return (
    <div className={fieldClasses.join(' ')}>
      {fields3x3}
    </div>
  );
};
