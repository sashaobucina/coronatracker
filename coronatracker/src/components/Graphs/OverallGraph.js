import React from "react";
import { Brush, Legend, AreaChart, XAxis, YAxis, Area, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
import { rounded } from "../../helpers/conversions";
import { useWindowDimensions } from "../../helpers/windowProvider";

export default function OverallGraph(props) {
  const { data } = props;
  const { height } = useWindowDimensions();

  const confirmedColor = "#DB7C00";
  const deathsColor = "#9C3321";
  const recoveredColor = "#478C30";

  const formatAxis = (num) => rounded(num);

  return (
    <ResponsiveContainer
        height={height * 0.6}
        style={{ minWidth: "100%" }}
      >
      <AreaChart
        data={data}
        title="Cases of COVID-19"
      >
        <defs>
          <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={confirmedColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={confirmedColor} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={deathsColor} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={deathsColor} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={recoveredColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={recoveredColor} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Brush
          dataKey="date"
          stroke='#3BBA9C'
          height={25}
          fill="#3C3F58"
          travellerWidth={8}
        />
        <XAxis dataKey="date" stroke={'#3BBA9C'} />
        <YAxis stroke={'#3BBA9C'} tickFormatter={formatAxis} />
        <Area
          dataKey="confirmed"
          fill="url(#colorConfirmed)"
          fillOpacity={1}
          stroke={confirmedColor}
          type="monotone"
        />
        <Area
          dataKey="deaths"
          fill="url(#colorDeaths)"
          fillOpacity={1}
          stroke="#F44336"
          type="monotone"
        />
        <Area
          dataKey="recovered"
          fill="url(#colorRecovered)"
          fillOpacity={1}
          stroke={recoveredColor}
          type="monotone" 
        />
        <Tooltip content={<CustomTooltip title="Date" />} />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
}