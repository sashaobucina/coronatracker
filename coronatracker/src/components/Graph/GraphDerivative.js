import React from "react";
import { Brush, CartesianGrid, Legend, XAxis, YAxis, LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

export default function GraphDerivative(props) {
  const { data, dataKey } = props;

  return (
    <ResponsiveContainer height={400}>
      <LineChart data={data} >
        <Brush stroke='#3BBA9C' height={25} fill="#3C3F58" travellerWidth={8} />
        <CartesianGrid strokeWidth={0.5} />
        <XAxis dataKey="date" stroke={'#3BBA9C'} />
        <YAxis stroke={'#3BBA9C'} />
        <Line type="monotone" dataKey={dataKey} stroke="#3BBA9C" strokeWidth={2} dot={false} />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
}