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
import { HIGH_IMAGE } from '../../../utils/app-image-constant';



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

     // Blurred large dot only on the last point
  const CustomDot = ({ cx, cy, index }) => {
    const isLast = index === data.length - 1;
    return isLast ? (
      <circle
        cx={cx}
        cy={cy}
        r={10}
        fill={graphColor}
        style={{ filter: "blur(3px)" }}
      />
    ) : null;
  };

  // Custom tooltip without box
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <p style={{ margin: 0, fontSize: '15px', color: "#fff" }}>
          {`${payload[0].value}%`}
        </p>
      );
    }
    return null;
  };
// Custom Active Dot with glow + solid circle
const ActiveDotWithGlow = ({ cx, cy }) => (
  <>
    {/* Outer blurred circle */}
    <circle
      cx={cx}
      cy={cy}
      r={10}
      fill={graphColor}
      style={{ filter: 'blur(2px)' }}
    />
    {/* Inner solid circle */}
    <circle
      cx={cx}
      cy={cy}
      r={3}
      fill={graphColor}
    />
  </>
);

 

    return (
        <>

            <div className="card avtivity-card " style={{borderColor:graphColor}}>
                <div className="card-body display-align p-2">
                    <div className="media display-align">
                        <span className="activity-icon me-md-2 me-2" style={{backgroundColor:graphColor}}>
                            <img src={icon} alt="graph-image" />
                        </span>

                        <div className="media-body">
                            <span className="font-w600">42%</span>
                            <p className="mb-0">{graphSensivityName}</p>
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
                                 dot={<CustomDot />}
                                 activeDot={<ActiveDotWithGlow />}
                                 />
                                  
                  <Tooltip      content={<CustomTooltip />}  cursor={false}/>
                        </LineChart>
                    </ResponsiveContainer>


                </div>
            </div>

        </>
    )
}

export default LineCharts;