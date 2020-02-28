import React from 'react'
import { NbrBox } from './NbrBox/NbrBox'

export const Field3x3 = ({ x3, y3, fieldModel, initialFieldModel, selectedNbr, handlers }) => {
  const boxes = []

  for (let y = y3; y < y3 + 3; y++) {
    for (let x = x3; x < x3 + 3; x++) {
      boxes.push(
        <NbrBox
          x={x}
          y={y}
          fieldModel={fieldModel}
          initialFieldModel={initialFieldModel}
          selectedNbr={selectedNbr}
          handlers={handlers}
          key={`${x}${y}`}
        />
      )
    }
  }

  return <div className="field3x3">{boxes}</div>
}
