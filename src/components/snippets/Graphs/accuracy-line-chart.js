import React from "react";
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
    const data = [
        { x: "Jan", encrypted: 0, },
        { x: "Feb", encrypted: 20, },
        { x: "Mar", encrypted: 10, },
        { x: "Apr", encrypted: 60, },
        { x: "May", encrypted: 50, },
        { x: "Jun", encrypted: 80, },
        { x: "Jul", encrypted: 90, },
        { x: "Aug", encrypted: 100, },
    ];
    return (
        <div>
            <div
                style={{
                    position: "relative",
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

                        <Line
                            type="monotone"
                            dataKey="encrypted"
                            stroke="#a16cff"
                            strokeWidth={4}
                            dot={false}
                        />
                    </LineChart>

                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default AccuracyLineChart;