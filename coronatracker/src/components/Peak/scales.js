import { scaleThreshold } from "d3-scale";

const PEAK_COLORS = [
  "#ff1212",
  "#ff5d12",
  "#ffa412",
  "#ffd412",
  "#c0ff12",
  "#53ff14",
];

const DAYS_SINCE = [2, 5, 10, 25, 50];

const PERCENT_BELOW = [5, 10, 25, 50, 75];

export const daysSinceScale = scaleThreshold()
  .domain(DAYS_SINCE)
  .range(PEAK_COLORS);

export const percentBelowScale = scaleThreshold()
  .domain(PERCENT_BELOW)
  .range(PEAK_COLORS);