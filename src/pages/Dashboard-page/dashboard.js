import React from 'react'
import DataStatistics from './dashboardSection/data-statistics'
import ImageClassification from './dashboardSection/image-classification'
import MonthlyEncryp from './dashboardSection/monthlyEncryp'
import EncrypUsesTimeline from './dashboardSection/encrypUsesTimeline'
import AccuracyModal from './dashboardSection/accuracyModal'
import ImageUploadBox from './dashboardSection/imageUploadBox'
import "./dashboard.css"


const Dashboard = () => {
    return (
        <>
            <div className='gradient-common-bg'>
                <div className='row'>
                    <div className='col-xl-6 col-xxl-12'>
                        <h5 className='my-3'>Upload Image</h5>
                        <ImageUploadBox/>
                    </div>
                    <div className='col-xl-6 col-xxl-12'>
                        <h5 className='my-3'>Data</h5>
                        <DataStatistics />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xl-6 col-xxl-12'>
                        <ImageClassification />
                    </div>
                    <div className='col-xl-6 col-xxl-12'>
                        <MonthlyEncryp />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xl-6 col-xxl-12'>
                        <EncrypUsesTimeline />
                    </div>
                    <div className='col-xl-6 col-xxl-12'>
                        <AccuracyModal />
                    </div>
                </div>

            </div>

        </>
    )
}

export default Dashboard