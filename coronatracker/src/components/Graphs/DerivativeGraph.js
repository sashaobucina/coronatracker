import React from "react";
import { Brush, CartesianGrid, Legend, XAxis, YAxis, LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";

export default function DerivativeGraph(props) {
  const { data, report } = props;

  const stroke = report !== "deaths" ? "#DB7C00" : "#F44336";

  return (
    <ResponsiveContainer height={400}>
      <LineChart data={data} >
        <Brush dataKey="date" stroke='#3BBA9C' height={25} fill="#3C3F58" travellerWidth={8} />
        <CartesianGrid strokeWidth={0.5} />
        <XAxis dataKey="date" stroke={'#3BBA9C'} />
        <YAxis stroke={'#3BBA9C'} />
        <Line type="monotone" dataKey={report} stroke={stroke} strokeWidth={2} dot={false} />
        <Tooltip content={<CustomTooltip title="Date" />} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}