import React from "react";
import { Brush, CartesianGrid, Legend, XAxis, YAxis, LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";
import { rounded } from "../../helpers/conversions";
import { useWindowDimensions } from "../../helpers/windowProvider";

export default function DerivativeGraph(props) {
  const { data, report } = props;
  const { height } = useWindowDimensions();

  const stroke = report !== "deaths" ? "#DB7C00" : "#F44336";

  const formatAxis = (num) => rounded(num);

  return (
    <ResponsiveContainer height={height * 0.5}>
      <LineChart data={data} >
        <Brush
          dataKey="date"
          fill="#3C3F58"
          height={25}
          stroke='#3BBA9C'
          travellerWidth={8}
        />
        <CartesianGrid strokeWidth={0.5} />
        <XAxis dataKey="date" stroke={'#3BBA9C'} />
        <YAxis stroke={'#3BBA9C'} tickFormatter={formatAxis} />
        <Line
          dataKey={report}
          dot={false}
          stroke={stroke}
          strokeWidth={2}
          type="monotone"
        />
        <Tooltip content={<CustomTooltip title="Date" />} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}