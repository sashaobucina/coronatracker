import React from "react";

function isDev() {
  return '_self' in React.createElement('div');
}

export function getCountry(country, countries) {
  return countries.reduce((acc, curr) => {
    return curr.toLowerCase() === country.toLowerCase() ? curr : acc
  }, null)
}

export function today() {
  const today = new Date();
  return `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()}`;
}

export const COLOURS = [
  "#55f1c2",
  "#684f9e",
  "#49c0f8",
  "#d1632f",
  "#b44286",
  "#d5e8e0",
  "#ffdc09",
  "#eb4956",
  "#6d884e",
  "#f5bc5e"
];

export const HEATMAP_COLORS = [
  "#ffe9e6",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618",
  "#611104"
]

export const HEATMAP_VALUES = [
  100,
  500,
  1000,
  5000,
  10000,
  25000,
  50000,
  100000,
  250000
];

export const HEATMAP_LABELS = [
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

export const FETCH_URL = isDev() ? "http://localhost:5000/cases" : "https://coronatracker-rest.herokuapp.com/cases";
export const PREFETCH_URL = isDev() ? "http://localhost:5000/" : "https://coronatracker-rest.herokuapp.com/";