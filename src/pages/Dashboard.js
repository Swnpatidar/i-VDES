import React from 'react'
import LineCharts from '../components/snippets/line-chart'

const Dashboard = () => {
    return (
        <>
            <div className="col-xl-6 col-xxl-12">
                <div className="card">
                    <div className="card-header d-sm-flex d-block pb-4">
                        <div className="me-auto pe-3 mb-sm-0 mb-3">
                            <h4 className="fs-20">Image Classification</h4>
                        </div>
                        {/* <div className="dropdown show">
                            <button
                                type="button"
                                className="btn rounded btn-primary light"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >

                                Dropdown
                                <svg
                                    className="ms-2"
                                    width={14}
                                    height={8}
                                    viewBox="0 0 14 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1 0.999999L7 7L13 1"
                                        stroke="#0B2A97"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end" style={{}}>
                                <a className="dropdown-item" href="javascript:void(0);">
                                    Edit
                                </a>
                                <a className="dropdown-item" href="javascript:void(0);">
                                    Delete
                                </a>
                            </div>
                        </div> */}
                    </div>
                    <div className="card-body pt-0 pb-0">
                        <div id="chartBar" style={{ minHeight: 415 }}>
                            <div
                                id="apexchartsugg209xq"
                                className="apexcharts-canvas apexchartsugg209xq apexcharts-theme-light"
                                style={{ width: 964, height: 400 }}
                            >
                                <LineCharts />

                                <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                    <div className="apexcharts-yaxistooltip-text" />
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