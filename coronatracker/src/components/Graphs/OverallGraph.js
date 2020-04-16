import React from "react";
import { Brush, Legend, AreaChart, XAxis, YAxis, Area, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
import { useWindowDimensions } from "../../helpers/windowProvider";

export default function OverallGraph(props) {
  const { data } = props;
  const { height } = useWindowDimensions();

  const confirmedColor = "#DB7C00";
  const deathsColor = "#9C3321";

  return (
    <ResponsiveContainer height={height * 0.6} style={{ minWidth: "100%" }}>
      <AreaChart data={data} title="Cases of COVID-19">
        <defs>
          <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={confirmedColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={confirmedColor} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={deathsColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={deathsColor} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Brush dataKey="date" stroke='#3BBA9C' height={25} fill="#3C3F58" travellerWidth={8} />
        <XAxis dataKey="date" stroke={'#3BBA9C'} />
        <YAxis stroke={'#3BBA9C'} />
        <Area type="monotone" dataKey="confirmed" stroke={confirmedColor} fillOpacity={1} fill="url(#colorConfirmed)"/>
        <Area type="monotone" dataKey="deaths" stroke="#F44336" fillOpacity={1} fill="url(#colorDeaths)"/>
        <Tooltip content={<CustomTooltip title="Date" />} />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
}