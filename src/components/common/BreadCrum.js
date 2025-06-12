import React from 'react'
import { BREADCRUM_ICON, RIGHTARROW_ICON } from '../../utils/app-image-constant'

const BreadCrum = ({ TableHeading, firstData, iconshow1, secondData,onSecondDataClick, thirdData, iconshow, className, onFirstDataClick, secondclassName }) => {
  return (
    <div>
 <div className={`${TableHeading} d-flex flex-wrap py-4  }`}>
      <h5 className={`mb-0 cursor-pointer fs-16 fw-400 ${className}`} onClick={onFirstDataClick}>{firstData}</h5>
      {iconshow1 && <img src={BREADCRUM_ICON} alt="icon" className="mx-1 headingarrowicon " />}
      <h5 className={`mb-0 cursor-pointer fs-16 fw-400  ${secondclassName}`} onClick={onSecondDataClick}>{secondData}</h5>
      {iconshow && <img src={BREADCRUM_ICON} alt="icon" className=" mt-2 headingarrowicon mt-1" />}
      <h5 className='mb-0 cursor-pointer mb-0'>{thirdData}</h5>
    </div>
    </div>
  )
}

export default BreadCrum
