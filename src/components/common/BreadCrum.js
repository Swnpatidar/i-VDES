import React from 'react'
import { RIGHTARROW_ICON } from '../../utils/app-image-constant'

const BreadCrum = ({ TableHeading, firstData, iconshow1, secondData,onSecondDataClick, thirdData, iconshow, className, onFirstDataClick, secondclassName }) => {
  return (
    <div>
 <div className={`${TableHeading} d-flex flex-wrap mb-3 tableheading }`}>
      <h5 className={`mb-0 cursor-pointer fs-18 fw-600 ${className}`} onClick={onFirstDataClick}>{firstData}</h5>
      {iconshow1 && <img src={RIGHTARROW_ICON} alt="icon" className="mx-2 headingarrowicon mt-1" />}
      <h5 className={`mb-0 cursor-pointer fs-18 fw-600  ${secondclassName}`} onClick={onSecondDataClick}>{secondData}</h5>
      {iconshow && <img src={RIGHTARROW_ICON} alt="icon" className=" mt-2 headingarrowicon mt-1" />}
      <h5 className='mb-0 cursor-pointer mb-0'>{thirdData}</h5>
    </div>
    </div>
  )
}

export default BreadCrum
