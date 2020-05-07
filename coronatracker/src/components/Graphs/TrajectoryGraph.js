import React from "react";
import { Tooltip, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line } from "recharts";
import CustomTooltip from "./CustomTooltip";
import { rounded } from "../../helpers/conversions";
import { useWindowDimensions } from "../../helpers/windowProvider";

export default function TrajectoryGraph(props) {
  const { data, scale } = props;
  const { height } = useWindowDimensions();
  const domain = scale === "log" ? [1, 10000000] : [1, 1000];
  const ticks = [1, 10, 100, 1000, 10000, 100000, 1000000];

  const formatAxis = (num) => rounded(num);

  return (
    <ResponsiveContainer height={height * 0.8}>
      <LineChart
        data={data}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeWidth={0.5} strokeDasharray="3 3"/>
        <XAxis
          dataKey="cases"
          name="Total Confirmed Cases"
          stroke={'#3BBA9C'}
          type="number"
          domain={[1, 1000000]}
          scale="log"
          ticks={ticks}
          tickFormatter={formatAxis}
        />
        <YAxis 
          dataKey="weekly"
          domain={domain}
          name="Weekly Confirmed Cases"
          label={{
            value: "New Cases (per week)",
            angle: -90,
            position: "insideBottomLeft",
            fill: "#3BBA9C",
            fontSize: 18,
            fontWeight: "normal"
          }}
          scale={scale}
          stroke={'#3BBA9C'}
          type="number"
          tickFormatter={formatAxis}
        />
        <Line
          dataKey={"weekly"}
          dot={false}
          animationDuration={400}
          name="Total Confirmed Cases"
          stroke="#3BBA9C"
          strokeWidth={2}
          type="monotone"
        />
        <Tooltip content={<CustomTooltip title="Confirmed Cases" />}/>
        <Legend iconSize={0} />
      </LineChart>
    </ResponsiveContainer>
  );
}