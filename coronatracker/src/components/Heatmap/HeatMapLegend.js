import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { HEATMAP_COLORS } from "./colors";

const LABELS = [
  "N/A",
  "<100",
  "100",
  "500",
  "1K",
  "5K",
  "10K",
  "25K",
  "50K",
  "100K",
  ">250K"
];

export default function HeatMapLegend() {
  const colors = HEATMAP_COLORS.slice();
  colors.unshift("#d4d4d4")
  return colors.map((color, i) => (
    <Paper
      key={i}
      elevation={0}
      square
      style={{
        height: 25,
        width: 35,
        backgroundColor: color
      }}
    >
      <Typography
        justify="center"
        variant="caption"
        style={{ fontWeight: "bold" }}
      >
        {LABELS[i]}
      </Typography>
    </Paper>
  ));
}