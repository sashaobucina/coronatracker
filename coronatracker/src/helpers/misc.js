import React from "react";

function isDev() {
  return '_self' in React.createElement('div');
}

export function getCountry(country, countries) {
  return countries.reduce((acc, curr) => {
    return curr.toLowerCase() === country.toLowerCase() ? curr : acc
  }, null)
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

export const FETCH_URL = isDev() ? "http://localhost:5000/cases/" : "https://coronatracker-rest.herokuapp.com/cases/";
export const PREFETCH_URL = isDev() ? "http://localhost:5000/" : "https://coronatracker-rest.herokuapp.com/";