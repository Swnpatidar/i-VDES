import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Label,
    Legend
} from "recharts";

const data = [
    { name: "Structured", value: 75 },
    { name: "Unstructured", value: 25 }
];

const COLORS = ["#a16cff", "#97dbfb"]; // violet, light blue

const CustomLegend = (props) => {
    const { payload } = props;
    return (
        <div className="legent-flex-gap-container">
            {payload?.map((entry, index) => (
                <div key={`item-${index}`} className="legent-flex-center-gap">
                    <div
                        className="legent-flex-width"
                        style={{
                            backgroundColor: entry.color,
                        }}
                    ></div>
                    <span style={{ color: '#fff', fontSize: "12px" }}>{entry.value}</span> {/* ✅ Use dynamic label */}
                </div>
            ))}
        </div>
    );
};

const DonutChart = () => {
    return (
        <>
            
            <div className="donutposition">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={90}
                            paddingAngle={8}
                            dataKey="value"
                            startAngle={150}
                            endAngle={-220}
                            labelLine={false}
                            cornerRadius={10}
                            stroke="none"
                            label={({
                                cx,
                                cy,
                                midAngle,
                                innerRadius,
                                outerRadius,
                                value,
                                index
                            }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                const labelText = `${value}%`;
                                const padding = 20;

                                return (
                                    <g transform={`translate(${x},${y})`}>
                                        <rect
                                            x={-labelText.length * 3.5 - padding / 2}
                                            y={-12}
                                            width={labelText.length * 7 + padding}
                                            height={25}
                                            fill="#ffffff33" // semi-transparent white background
                                            rx={6}
                                            ry={20}
                                        />
                                        <text
                                            fill="#fff"
                                            textAnchor="middle"
                                            dominantBaseline="central"
                                            fontSize={14}
                                        >
                                            {labelText}
                                        </text>
                                    </g>
                                );
                            }}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend
                            content={<CustomLegend />}
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </>
    )
}

export default DonutChart;