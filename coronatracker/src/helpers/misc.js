import React from "react";

function isDev() {
  return '_self' in React.createElement('div');
}

export const FETCH_URL = isDev() ? "http://localhost:5000/cases" : "https://coronatracker-rest.herokuapp.com/cases";
export const PREFETCH_URL = isDev() ? "http://localhost:5000/" : "https://coronatracker-rest.herokuapp.com/";

const BASE_URL = isDev() ? "http://localhost:5000" : "https://coronatracker-rest.herokuapp.com";
export const VALID_COUNTRIES_URL = `${BASE_URL}/valid-countries`;
export const TOP_CONTRIBUTORS_URL = `${BASE_URL}/top-contributors`;
export const COUNTRY_DATA_URL = (country) => `${BASE_URL}/cases/${country}`;
export const TOP_MOVERS_URL = `${BASE_URL}/top-movers`;
export const PEAK_URL = `${BASE_URL}/peak-data`;
export const HEATMAP_URL = `${BASE_URL}/cases`;
export const NEWS_URL = (country) => `${BASE_URL}/news/country/${country}`;
export const NEWS_SUPPORTED_URL = `${BASE_URL}/news/supported-countries`;
