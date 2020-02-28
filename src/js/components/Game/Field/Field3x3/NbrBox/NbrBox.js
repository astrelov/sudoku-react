import React from 'react'
import { NbrWrapper } from './NbrWrapper/NbrWrapper'

export const NbrBox = ({ x, y, fieldModel, initialFieldModel, selectedNbr, handlers }) => {
  const { handleInput } = handlers
  const boxClasses = ['nbr-box']

  initialFieldModel[x][y] && boxClasses.push('no-events')

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
  )
}
