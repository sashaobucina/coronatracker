import React, { Component } from "react";
import { Tooltip, XAxis, YAxis, ResponsiveContainer, CartesianGrid, ScatterChart, Scatter, Legend } from "recharts";

// convert to scatter chart with line prop
class GraphWeekly extends Component {
  render() {
    const { data, scale } = this.props;
    const domain = scale === "log" ? [1, 10000000] : [1, 10000];
    const ticks = [1, 10, 100, 1000, 10000, 100000, 10000000];
    return (
      <ResponsiveContainer height={550} style={{ minWidth: "100%" }}>
        <ScatterChart margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeWidth={0.5} strokeDasharray="3 3"/>
          <XAxis dataKey="cases" name="Total Confirmed Cases" stroke={'#3BBA9C'} type="number" domain={[1, 1000000]} scale="log" ticks={ticks} />
          <YAxis 
            dataKey="weekly"
            name="Weekly Confirmed Cases"
            label={{ value: "Confirmed Cases (per week)", angle: -90, position: "insideBottomLeft", fill: "#3BBA9C" }} 
            stroke={'#3BBA9C'}
            type="number"
            domain={domain}
            scale={scale}
          />
          <Scatter name="Total Confirmed Cases" data={data} fill="#3BBA9C" stroke="#3BBA9C" line animationDuration={400} />
          <Tooltip />
          <Legend />
        </ScatterChart>
      </ResponsiveContainer>
    )
  }
}

export default GraphWeekly;