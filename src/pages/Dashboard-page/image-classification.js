import React from 'react'
import LineCharts from '../../components/snippets/Graphs/line-chart'
import { HIGH_IMAGE, LOW_IMAGE, MEDIUM_IMAGE, NONE_IMAGE } from '../../utils/app-image-constant'

const ImageClassification = () => {
    return (
        <>
            <div className='image-classification h-100'>
                <div className="card h-100">
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
                        <LineCharts graphColor="rgba(240, 18, 35, 0.5)" graphSensivityName="High" icon={HIGH_IMAGE} />
                        <LineCharts graphColor="rgba(0, 102, 255, 0.5)" graphSensivityName="Medium" icon={MEDIUM_IMAGE} />
                        <LineCharts graphColor="rgba(0, 168, 22, 0.5)" graphSensivityName="Low" icon={LOW_IMAGE} />
                        <LineCharts graphColor="rgba(172, 177, 211, 0.5)" graphSensivityName="None" icon={NONE_IMAGE} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageClassification