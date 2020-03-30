import React from "react";

function isDev() {
  return '_self' in React.createElement('div');
}

export const URL = isDev ? "http://localhost:5000/covid19/" : "http://localhost:5000/covid19/";

