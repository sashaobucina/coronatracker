import React, { Component } from "react";
import { Brush, Legend, AreaChart, XAxis, YAxis, Area, Tooltip, ResponsiveContainer } from "recharts";

class GraphOverall extends Component {
  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer height={500} style={{ minWidth: "100%" }}>
        <AreaChart data={data} title="Cases of COVID-19">
          <defs>
            <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a15c03" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#a15c03" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9c3321" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#9c3321" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#447a28" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#447a28" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Brush stroke='#3BBA9C' height={25} fill="#3C3F58" travellerWidth={8} />
          <XAxis dataKey="date" stroke={'#3BBA9C'} />
          <YAxis stroke={'#3BBA9C'} />
          <Area type="monotone" dataKey="confirmed" stroke="#a15c03" fillOpacity={1} fill="url(#colorConfirmed)"/>
          <Area type="monotone" dataKey="deaths" stroke="red" fillOpacity={1} fill="url(#colorDeaths)"/>
          <Area type="monotone" dataKey="recovered" stroke="green" fillOpacity={1} fill="url(#colorRecovered)" />
          <Tooltip />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

export default GraphOverall;