import React from 'react'
import ImageClassification from './image-classification'
import StylishLineChart from '../../components/snippets/Graphs/stylish-line-chart'
import TimelineChart from '../../components/snippets/Graphs/timeline-line-chart'
import AccuracyLineChart from '../../components/snippets/Graphs/accuracy-line-chart'
import DataStatistics from './data-statistics'
import MonthlyEncryp from './monthlyEncryp'
import AccuracyModal from './accuracyModal'
import EncrypUsesTimeline from './encrypUsesTimeline'

const Dashboard = () => {
    return (
        <>
            <div className='row'>
                <div className='col-xl-6 col-xxl-12'>
                    <DataStatistics />
                </div>
                <div className='col-xl-6 col-xxl-12'>
                    <ImageClassification />
                </div>
            </div>
            <div className='row'>
                <div className='col-xl-6 col-xxl-12'>
                    <MonthlyEncryp />
                </div>
                <div className='col-xl-6 col-xxl-12'>
                    <EncrypUsesTimeline />
                </div>
            </div>
            <div className='row'>
                <div className='col-xl-6 col-xxl-12'>
                    <AccuracyModal/>
                </div>
            </div>
           

        </>
    )
}

export default Dashboard