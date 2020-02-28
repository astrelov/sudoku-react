import React from 'react'
import { Field3x3 } from './Field3x3/Field3x3'

export const Field = ({ fieldModel, initialFieldModel, selectedNbr, isWin, handlers }) => {
  const fields3x3 = []
  const fieldClasses = isWin ? 'no-events' : ''

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
      )
    }
  }

  return (
    <div id="field" className={fieldClasses}>
      {fields3x3}
    </div>
  )
}
