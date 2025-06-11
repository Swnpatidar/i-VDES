import React from 'react'
import AccuracyLineChart from '../../components/snippets/Graphs/accuracy-line-chart'

const AccuracyModal = () => {
    return (
        <>
            <div className='accuracy-modal'>
                <div className="card">
                    <div className="card-header d-sm-flex d-block pb-4">
                        <div className="me-auto pe-3 mb-sm-0 mb-3">
                            <h4 className="fs-20">Modal Accuracy Chart</h4>
                        </div>
                    </div>
                    <div className="card-body pt-0 pb-0">
                        <AccuracyLineChart/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccuracyModal