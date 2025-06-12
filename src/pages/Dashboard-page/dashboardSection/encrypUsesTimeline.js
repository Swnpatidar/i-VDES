import React from 'react'
import TimelineChart from '../../../components/snippets/Graphs/timeline-line-chart'

const EncrypUsesTimeline = () => {
    return (
        <>
            <div className='encryption-timeline h-100'>
                <div className="card h-100">
                    <div className="card-header d-sm-flex d-block pb-4">
                        <div className="me-auto pe-3 mb-sm-0 mb-3">
                            <h4 className="fs-20">Encryption Uses Timeline</h4>
                        </div>
                    </div>
                    <div className="card-body pt-0 pb-0">
                        <TimelineChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EncrypUsesTimeline