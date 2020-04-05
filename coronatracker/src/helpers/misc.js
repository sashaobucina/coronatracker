import React from "react";

function isDev() {
  return '_self' in React.createElement('div');
}

export function getCountry(country, countries) {
  return countries.reduce((acc, curr) => {
    return curr.toLowerCase() === country.toLowerCase() ? curr : acc
  }, null)
}

export const FETCH_URL = isDev() ? "http://localhost:5000/covid19/" : "https://coronatracker-rest.herokuapp.com/covid19/";
export const PREFETCH_URL = isDev() ? "http://localhost:5000/" : "https://coronatracker-rest.herokuapp.com/";