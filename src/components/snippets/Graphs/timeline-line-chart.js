import React from "react";
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
  const data = [
    { x: "Jan", ECC: 0, ECC2: 40 },
    { x: "Feb", ECC: 20, ECC2: 60 },
    { x: "Mar", ECC: 25, ECC2: 45 },
    { x: "Apr", ECC: 30, ECC2: 50 },
    { x: "May", ECC: 28, ECC2: 40 },
    { x: "Jun", ECC: 50, ECC2: 35 },
    { x: "Jul", ECC: 35, ECC2: 25 },
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

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={data}    >


            <XAxis
              dataKey="x"
              axisLine={{
                stroke: "rgba(134, 117, 255, 1)"
                , strokeWidth: 4
              }} // custom axis line color
              tickLine={false}
              tick={{ fill: "#ffffff", dy: 15 }}
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
              dataKey="ECC"
              stroke="#a16cff"
              strokeWidth={4}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="ECC2"
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