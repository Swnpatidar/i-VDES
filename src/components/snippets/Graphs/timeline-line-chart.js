import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const TimelineChart = () => {

   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const data = [

    { x: "Jan", AEC: 0, RSA: 40 },
    { x: "Feb", AEC: 20, RSA: 60 },
    { x: "Mar", AEC: 25, RSA: 45 },
    { x: "Apr", AEC: 30, RSA: 50 },
    { x: "May", AEC: 28, RSA: 40 },
    { x: "Jun", AEC: 50, RSA: 35 },
    
  ];
  const CustomLegend = (props) => {
    const { payload } = props;
    return (
      <div style={{ display: 'flex', gap: '16px', paddingBottom: "20px" }}>
        {payload?.map((entry, index) => (
          <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: entry.color,
                borderRadius: '3px',
              }}
            ></div>
            <span style={{ color: '#fff' }}>{entry.value}</span> 
          </div>
        ))}
      </div>
    );
  };


  return (
    <div>
      <div
        style={{

          borderRadius: "16px",
        }}
      >

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={data} 
        margin={{ top:isMobile ? 10 :0 , right: isMobile ? 5 :13, left:isMobile ? -15 :0 , bottom:isMobile ? 20 :6 }}
          
          >


            <XAxis
              dataKey="x"
              axisLine={{
                stroke: "rgba(134, 117, 255, 1)"
                , strokeWidth: 4
              }} // custom axis line color
              tickLine={false}
             
               tick={{
                fill: "#ffffff",
                dy: 12,
                angle: isMobile ? -35 : 0,
                textAnchor: isMobile ? "end" : "middle"
              }}
              interval={0}
            />

            <YAxis
              stroke="#888"
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={{
                stroke: " rgba(98, 129, 254, 1)"
                , strokeWidth: 4
              }} // custom axis line color
              tickLine={false}
              tick={{ fill: "#888" }}
              tickFormatter={(value) => `${value}%`}
            />
            <Legend
              content={<CustomLegend />}
              layout="horizontal"
              verticalAlign="top"
              align="center"

            />
            <Line
              type="monotone"
              dataKey="AEC"
              stroke="#a16cff"
              strokeWidth={4}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="RSA"
              stroke="rgba(151, 219, 251, 1)"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>

        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TimelineChart;