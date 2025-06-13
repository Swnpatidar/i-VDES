import React from 'react'
import DataStatistics from './dashboardSection/data-statistics'
import ImageClassification from './dashboardSection/image-classification'
import MonthlyEncryp from './dashboardSection/monthlyEncryp'
import ImageUploadBox from './dashboardSection/imageUploadBox'
import "./dashboard.css"
import BreadCrum from '../../components/common/BreadCrum'
import Button from '../../components/common/button'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../hooks/routes/routes-constant'
import { ARROW_ICON } from '../../utils/app-image-constant'


const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <>
           <div>
                <div className="d-flex justify-content-between align-items-center">
        <BreadCrum
          firstData="Dashboard"
          iconshow1={false}
        />
          <Button label='View more' className="rounded-3 px-4 fs-14 "   onClick={() => navigate(ROUTES?.DASHBOARDDETAILS)}   icon={ARROW_ICON} iconPosition="back" />
      </div>
<div className="gradient-common-bg container-fluid">
  <div className="row">
    {/* Upload Image - Full height Left - col-5 */}
    <div className="col-md-5 d-flex flex-column">
      <h5 className="my-3">Upload Image</h5>
      <div className="flex-grow-1">
        <ImageUploadBox />
      </div>
    </div>

    {/* Right Side: Statistics + Classification */}
    <div className="col-md-7">
      <h5 className="my-3">Your Statistics</h5>
      <div className="row">
        {/* Data Statistics - col-4 */}
        <div className="col-md-4 col-lg-6 mb-3">
          <DataStatistics />
        </div>
        {/* Image Classification - col-8 */}
        <div className="col-md-8 col-lg-6 mb-3">
          <ImageClassification />
        </div>
      </div>

      {/* Monthly Chart (below stats) */}
      <div className="row">
        <div className="col-12">
          <MonthlyEncryp />
        </div>
      </div>
    </div>
  </div>
</div>
</div>

        </>
    )
}

export default Dashboard