import React from 'react'
import { Image } from '../../../../../Image'

export const NbrWrapper = ({ x, y, fieldModel, initialFieldModel, selectedNbr }) => {
  function getWrapperClasses(value, selectedNbr) {
    const wrapperClasses = ['nbr-wrapper', 'no-events']

    initialFieldModel[x][y] && wrapperClasses.push('initial-nbr')

    selectedNbr &&
      (value === selectedNbr || (Array.isArray(value) && value.includes(selectedNbr))) &&
      wrapperClasses.push('selected')

    return wrapperClasses
  }

  function getImgClasses(value) {
    const imgClasses = ['no-events']

    Array.isArray(value) && imgClasses.push('pncl-nbr')

    return imgClasses
  }

  function getPnclNbrImgs(value, imgClasses, imgColor) {
    const imgs = []

    imgClasses.push('pncl-nbr')

    value.forEach((nbr, ind) => {
      imgs.push(
        <Image
          src={`./src/resources/img/numbers/${nbr}_${imgColor}.png`}
          classNames={imgClasses}
          key={ind.toString()}
        />
      )
    })
    return imgs
  }

  function getNbrImg(nbr, imgClasses, imgColor) {
    return (
      <Image src={`./src/resources/img/numbers/${nbr}_${imgColor}.png`} classNames={imgClasses} />
    )
  }

  const value = fieldModel[x][y]
  const wrapperClasses = getWrapperClasses(value, selectedNbr)
  const imgClasses = getImgClasses(value)
  const imgColor = initialFieldModel[x][y] ? '1e1e1e' : 'c8c8c8'
  let imgs

  imgs = Array.isArray(value)
    ? getPnclNbrImgs(value, imgClasses, imgColor)
    : getNbrImg(value, imgClasses, imgColor)

  return <div className={wrapperClasses.join(' ')}>{imgs}</div>
}
