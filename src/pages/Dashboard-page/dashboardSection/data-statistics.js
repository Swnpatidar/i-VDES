import React from 'react'
import DonutChart from '../../../components/snippets/Graphs/donut-chart';

const DataStatistics = () => {
    return (
        <>
            <div className='data-statistics h-100 '>
                <div className="card h-100">
                    <div className="card-header d-sm-flex d-block pb-4">
                        <div className="me-auto pe-3 mb-sm-0 mb-3">
                            <h4 className="fs-20">Data Statistics</h4>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <DonutChart />
                    </div>
                </div>
            </div>

        </>
    )
}

export default DataStatistics;