import React from "react";

const compareFn = (a, b) => {
  if (a.value < b.value) {
    return 1;
  } else if (a.value > b.value) {
    return -1;
  }
  return 0;
}

export default function CustomTooltip ({ active, label, payload, title }) {
  if (active && payload) {
    // sort the payload
    payload.sort(compareFn);

    // accumulate the labels
    const labels = payload.map((entry, i) =>
      <p className="label" key={i} style={{ color: entry.stroke }}>{`${entry.dataKey} : ${entry.value}`}</p>
    );

    return (
      <div className="custom-tooltip" style={{ backgroundColor: "#3C3F58", padding: 5 }}>
        <p className="intro" style={{ fontWeight: "bolder" }}>{`${title} - ${label}`}</p>
        { labels }
      </div>
    );
  }
  return null
}