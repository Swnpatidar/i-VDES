import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
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

  const CustomLegend = ({ payload }) => (
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

 const renderActiveDot = (color) => ({ cx, cy }) => (
  <>
    <circle
      cx={cx}
      cy={cy}
      r={15}
      fill={color}
      style={{ filter: "blur(1px)", opacity: 0.6 }}
    />
    <circle
      cx={cx}
      cy={cy}
      r={3.5} // Tiny center dot
      fill="#ffffff"
    />
  </>
);

  const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    // Sort payload to show RSA first, then AEC
    const sortedPayload = [...payload].sort((a, b) => {
      if (a.name === "RSA") return -1;
      if (b.name === "RSA") return 1;
      return 0;
    });

    return (
      <div style={{
        color: "#fff",
        // padding: "10px",
        fontSize: "14px",
      }}>
        <div><strong>Month:</strong> {label}</div>
        {sortedPayload.map((entry, i) => (
          <div key={i}>
            <span style={{ color: entry.color }}> <strong>{entry.name}</strong></span>: {entry.value}%
          </div>
        ))}
      </div>
    );
  }
  return null;
};



  return (
    <div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: isMobile ? 10 : 0, right: isMobile ? 5 : 13, left: isMobile ? -15 : 0, bottom: isMobile ? 20 : 6 }}
        >
          <XAxis
            dataKey="x"
            axisLine={{ stroke: "rgba(134, 117, 255, 1)", strokeWidth: 4 }}
            tickLine={false}
            tick={{
              fill: "#ffffff",
              dy: 12,
              angle: isMobile ? -35 : 0,
              textAnchor: isMobile ? "end" : "middle",
            }}
            interval={0}
          />
          <YAxis
            stroke="#888"
            ticks={[0, 20, 40, 60, 80, 100]}
            axisLine={{ stroke: "rgba(98, 129, 254, 1)", strokeWidth: 4 }}
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
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Line
            type="monotone"
            dataKey="AEC"
            stroke="#a16cff"
            strokeWidth={4}
            dot={false}
            activeDot={renderActiveDot("#a16cff")}
          />
          <Line
            type="monotone"
            dataKey="RSA"
            stroke="rgba(151, 219, 251, 1)"
            strokeWidth={4}
            dot={false}
            activeDot={renderActiveDot("rgba(151, 219, 251, 1)")}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;
