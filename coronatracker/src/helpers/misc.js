import React from "react";

function isDev() {
  return '_self' in React.createElement('div');
}

export const FETCH_URL = isDev() ? "http://localhost:5000/cases" : "https://coronatracker-rest.herokuapp.com/cases";
export const PREFETCH_URL = isDev() ? "http://localhost:5000/" : "https://coronatracker-rest.herokuapp.com/";