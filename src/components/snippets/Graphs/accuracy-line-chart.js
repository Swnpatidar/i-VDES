import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const AccuracyLineChart = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
    const data = [
        { x: "Jan", encrypted: 0, },
        { x: "Feb", encrypted: 20, },
        { x: "Mar", encrypted: 10, },
        { x: "Apr", encrypted: 60, },
        { x: "May", encrypted: 50, },
        { x: "Jun", encrypted: 80, },
       ];

   const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ color: "#fff", fontSize: "14px", background: "transparent", padding: 4 }}>
        <div>{`Month: ${label}`}</div>
        <div>{`Encrypted: ${payload[0].value}%`}</div>
      </div>
    );
  }
  return null;
};

    return (
  <div className="d-flex justify-content-center align-items-center" >
    <div
     className="accuracy-chart-wrapper"
    //  style={{ width: "100%", paddingRight: isMobile ? 20 : 0 }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}
        margin={{ top:isMobile ? 50 :0 , right: isMobile ? 5 :13, left:isMobile ? -15 :0 , bottom:isMobile ? 20 :10 }}
        >
          <XAxis
            dataKey="x"
            axisLine={{ stroke: "rgba(134, 117, 255, 1)", strokeWidth: 4 }}
            tickLine={false}
            tick={{
                fill: "#ffffff",
                dy:isMobile ? 4 :12,
                angle: isMobile ? -35 : 0,
                textAnchor: isMobile ? "end" : "middle"
              }}
            interval={0}
          />
          <YAxis
            stroke="#888"
            ticks={[0, 20, 40, 60, 80, 100]}
            axisLine={{ stroke: " rgba(98, 129, 254, 1)", strokeWidth: 4 }}
            tickLine={false}
            tick={{ fill: "#888" }}
            tickFormatter={(value) => `${value}%`}
          />
     <Line
  type="monotone"
  dataKey="encrypted"
  stroke="#a16cff"
  strokeWidth={4}
  dot={false}
  activeDot={({ cx, cy }) => (
    <>
      {/* Outer blurred purple glow */}
      <circle
        cx={cx}
        cy={cy}
        r={10}
        fill="#a16cff"
        style={{ filter: "blur(2px)", opacity: 0.6 }}
      />
      {/* White center dot */}
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill="#ffffff"
      />
    </>
  )}
/>


                     <Tooltip content={<CustomTooltip />} cursor={false} />

          
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

  

   
}

export default AccuracyLineChart;