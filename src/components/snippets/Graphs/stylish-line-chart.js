import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const data = [
  { x: "Jan", encrypted: 10, decrypted: 8 },
  { x: "Feb", encrypted: 14, decrypted: 14 },
  { x: "Mar", encrypted: 28, decrypted: 18 },
  { x: "Apr", encrypted: 35, decrypted: 35 },
  { x: "May", encrypted: 35, decrypted: 25 },
  { x: "Jun", encrypted: 38, decrypted: 38 },
 
];
const CustomDot = ({ cx, cy }) => {
  // Box dimensions
  const boxWidth = 80;
  const boxHeight = 200;

  return (
    <g>
      <defs>
        <linearGradient id="boxGradient" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#332F67" stopOpacity={1} />
          <stop offset="50%" stopColor="#454185" stopOpacity={1} />
          <stop offset="100%" stopColor="#3D3C7D" stopOpacity={1} />
        </linearGradient>


      </defs>

      {/* Shadow box around the dot - centered */}
      <rect
        x={cx - boxWidth / 2}
        y={cy - boxHeight / 2}
        width={boxWidth}
        height={boxHeight}
        rx={10}
        fill="url(#boxGradient)"  // <-- apply gradient here
        opacity={0.1}


      />

      {/* Main dot circles */}
      <circle cx={cx} cy={cy} r={30} fill="rgba(90, 48, 88, 1)
" opacity={0.2} />
      <circle cx={cx} cy={cy} r={20} fill="rgba(113, 57, 96, 1)" opacity={0.6} />
      <circle cx={cx} cy={cy} r={10} fill="rgba(155, 90, 130, 0.2 )" opacity={0.6} />
      <circle cx={cx} cy={cy} r={4} fill="rgba(255, 216, 250, 1)
" />
    </g>
  );
};


const CustomCursor = ({ points, height }) => {
  const x = points[0].x;
  const gap = 15;
  const top = 50;
  const bottom = height - 50; // Avoids going all the way down

  return (
    <>
      <line x1={x - gap} y1={top} x2={x - gap} y2={bottom} stroke="rgba(245, 166, 35, 0.5)" strokeWidth={1} />
      <line x1={x + gap} y1={top} x2={x + gap} y2={bottom} stroke="rgba(232, 55, 228, 0.5)" strokeWidth={1} />
    </>
  );
};

const CustomTooltip = ({ active, payload, coordinate }) => {
  if (active && payload && payload.length && coordinate) {
    const x = coordinate.x;
    const fixedTop = 20; // stays fixed at the top

    return (
      <div
        style={{
          position: "absolute",
          left: x + 2,  // 🔧 Adjust this value to move more right
          top: fixedTop,
          zIndex: 9999,
          display: "flex",
          gap: "8px",
          // backgroundColor: "rgba(32, 30, 66, 0.8)",
          borderRadius: "12px",
          // padding: "1px 0px",
          color: "#fff",
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "rgba(167, 115, 47, 1)",
              borderRadius: "50%",
              display: "inline-block",
            }}
          ></span>
          {payload[0].value}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "rgba(251, 73, 192, 1)",
              borderRadius: "50%",
              display: "inline-block",
            }}
          ></span>
          {payload[1].value}
        </div>
      </div>

    );
  }

  return null;
};


const StylishLineChart = () => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "16px",
      }}
    >

      {/* Legend for Encrypted & Decrypted */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        {/* Encrypted pill */}
        <div
          style={{
            background: "linear-gradient(90deg, #ff00ff, #ff6ec4)",
            padding: "2px",
            borderRadius: "999px",
            display: "inline-block",
          }}
        >
          <div
            style={{
              backgroundColor: "#0a0a23",
              color: "#ff6ec4",
              display: "flex",
              alignItems: "center",
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#ff00ff",
                marginRight: "8px",
              }}
            ></span>
            Encrypted
          </div>
        </div>

        {/* Decrypted pill */}
        <div
          style={{
            border: "1.5px solid orange",
            color: "orange",
            display: "flex",
            alignItems: "center",
            padding: "4px 12px",
            borderRadius: "999px",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "orange",
              marginRight: "8px",
            }}
          ></span>
          Decrypted
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data} >
          {/* <CartesianGrid strokeDasharray="3 3" stroke="#444" /> */}

          <XAxis
            dataKey="x"
            axisLine={false}     // removes the axis line
            tickLine={false}     // removes the small tick marks
            tick={{ fill: "#ffffff", dy: 15 }}
          />

          <YAxis
            stroke="#888"
            ticks={[0, 10, 20, 30, 40, 50]}
            axisLine={false}     // removes the axis line
            tickLine={false}     // removes the tick marks
            tick={{ fill: "#888" }} // optional: keep the labels


          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
          // position={{ x: 500, y: 50 }} // <-- Fixes tooltip position
          />

          <Line
            type="monotone"
            dataKey="encrypted"
            stroke="rgba(251, 73, 192, 1)"
            strokeWidth={4}
            dot={false}
            activeDot={<CustomDot stroke="rgba(251, 73, 192, 1)" />}
          />
          <Line
            type="monotone"
            dataKey="decrypted"
            stroke="rgba(245, 166, 35, 0.8)"
            strokeWidth={2}
            dot={false}
            activeDot={<CustomDot stroke="rgba(245, 166, 35, 0.8)" />}
          />


        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StylishLineChart