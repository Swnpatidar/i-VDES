import React from 'react'
import "../../../pages/Dashboard-page/dashboard.css"

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
import { HIGH_IMAGE } from '../../../utils/aap-image-constant';



const LineCharts = ({graphColor="",graphSensivityName="",icon=""}) => {
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

   

    const CustomDot = (props) => {
        const { cx, cy, payload, index, data } = props;
        if (index === data.length - 1) {
            return <Dot cx={cx} cy={cy} r={9} fill={graphColor} style={{ filter: "blur(3px)" }} />
        }

        return null;
    };

    return (
        <>

            <div className="card avtivity-card">
                <div className="card-body display-align p-2">
                    <div className="media display-align">
                        <span className="activity-icon me-md-4 me-3" style={{backgroundColor:graphColor}}>
                            <img src={icon} alt="graph-image" />
                        </span>

                        <div className="media-body">
                            <span className="font-w600">42%</span>
                            <p className="mb-2">{graphSensivityName}</p>
                        </div>
                    </div>

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
                                stroke={graphColor}
                                strokeWidth={4}
                                dot={(props) => <CustomDot {...props} data={data} />}
                                activeDot={{ r: 1 }} />
                            {/* <Tooltip /> */}
                        </LineChart>
                    </ResponsiveContainer>


                </div>
            </div>

        </>
    )
}

export default LineCharts;