import React from 'react'
import "../snippets/graph.css"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Dot,
} from 'recharts';
import { HIGH_IMAGE } from '../../utils/aap-image-constant';
import { filter } from 'lodash';



const LineCharts = () => {
    const data = [
        {

            amt: 10,
        },
        {

            amt: 100,
        },
        {

            amt: 80,
        },
        {

            amt: 40,
        },
        {

            amt: 15,
        },
        {

            amt: 78,
        },
    ]

    const color = "#f01223"

    const CustomDot = (props) => {
        const { cx, cy, payload, index, data } = props;
        if (index === data.length - 1) {
            return <Dot cx={cx} cy={cy} r={9} fill={color} style={{ filter: "blur(3px)" }} />
        }

        return null;
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card avtivity-card">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <span className="activity-icon bgl-success me-md-4 me-3">
                                    <svg
                                        width={40}
                                        height={40}
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip2)">
                                            <path
                                                d="M14.6406 24.384C14.4639 24.1871 14.421 23.904 14.5305 23.6633C15.9635 20.513 14.4092 18.7501 14.564 11.6323C14.5713 11.2944 14.8346 10.9721 15.2564 10.9801C15.6201 10.987 15.905 11.2962 15.8971 11.6598C15.8902 11.9762 15.8871 12.2939 15.8875 12.6123C15.888 12.9813 16.1893 13.2826 16.5583 13.2776C17.6426 13.2628 19.752 12.9057 20.5684 10.4567L20.9744 9.23876C21.7257 6.9847 20.4421 4.55115 18.1335 3.91572L13.9816 2.77294C12.3274 2.31768 10.5363 2.94145 9.52387 4.32498C4.66826 10.9599 1.44452 18.5903 0.0754914 26.6727C-0.300767 28.8937 0.754757 31.1346 2.70222 32.2488C13.6368 38.5051 26.6023 39.1113 38.35 33.6379C39.3524 33.1709 40.0002 32.1534 40.0002 31.0457V19.1321C40.0002 18.182 39.5322 17.2976 38.7484 16.7664C34.5339 13.91 29.1672 14.2521 25.5723 18.0448C25.2519 18.3828 25.3733 18.937 25.8031 19.1166C27.4271 19.7957 28.9625 20.7823 30.2439 21.9475C30.5225 22.2008 30.542 22.6396 30.2654 22.9155C30.0143 23.1658 29.6117 23.1752 29.3485 22.9376C25.9907 19.9053 21.4511 18.5257 16.935 19.9686C16.658 20.0571 16.4725 20.3193 16.477 20.61C16.496 21.8194 16.294 22.9905 15.7421 24.2172C15.5453 24.6544 14.9607 24.7409 14.6406 24.384Z"
                                                fill="#27BC48"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip2">
                                                <rect width={40} height={40} fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <div className="media-body">
                                    <p className="fs-14 mb-2">Weekly Progress</p>
                                    <span className="title text-black font-w600">42%</span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
               
              
            </div>

            {/* */}
            <div className='row'>
                <div className='col-xl-4 col-lg-4 col-md-12 col-12 lineGraph'>
                    <div className='row'>
                        {/* Div for Image and value */}
                        <div className="col-xl-3 col-lg-3 col-md-12 col-12 main-lineChart-left-panel">
                            <div className='image-panel'>
                                <img src={HIGH_IMAGE} alt="graph-image" />
                            </div>
                            <div className='value-panel'>
                                <h1>80</h1>
                                <p>High</p>
                            </div>
                        </div>

                        {/* Line Graph Div */}
                        <div className='col-xl-9 col-lg-9 col-md-12 col-12 main-lineChart-right-panel'>
                            <ResponsiveContainer width="100%" height={50}>
                                <LineChart
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <Line
                                        type="liner"
                                        dataKey="amt"
                                        stroke={color}
                                        strokeWidth={4}
                                        dot={(props) => <CustomDot {...props} data={data} />}
                                        activeDot={{ r: 1 }} />
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LineCharts;