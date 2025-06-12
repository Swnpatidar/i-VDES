import React from 'react'
import StylishLineChart from '../../components/snippets/Graphs/stylish-line-chart';

const MonthlyEncryp = () => {
    return (
        <>
            <div className='monthlyEncrypChart h-100'>
                <div className="card h-100">
                    <div className="card-header d-sm-flex d-block pb-4">
                        <div className="me-auto pe-3 mb-sm-0 mb-3">
                            <h4 className="fs-20">Monthly Encryption & Decryption</h4>
                        </div>
                    </div>
                    <div className="card-body pt-0 pb-0">
                        <StylishLineChart/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MonthlyEncryp;