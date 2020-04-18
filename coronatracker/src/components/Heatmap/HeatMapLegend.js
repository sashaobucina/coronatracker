import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { HEATMAP_COLORS, HEATMAP_LABELS } from "../../helpers/misc";

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
        {HEATMAP_LABELS[i]}
      </Typography>
    </Paper>
  ));
}