import React, { useReducer } from "react";
import AppRouter from "./AppRouter";
import { NO_ALERT } from "../helpers/alerts";

const initialHomeState = {
  countries: [],
  data: [],
  tabIndex: 0
};

export const AppContext = React.createContext({});

export default function AppProvider() {
  let initialState = {
    alert: NO_ALERT,
    main: initialHomeState,
    path: "/",
    topMovers: null,
    peak: null,
    heatmap: [],
  };

  let reducer = (state, action) => {
    switch (action.type) {
      case "update-heatmap":
        return { ...state, heatmap: action.payload };
      case "update-main":
        return { ...state, main: action.payload };
      case "update-peak":
        return { ...state, peak: action.payload };
      case "update-top-movers":
        return { ...state, topMovers: action.payload };
      case "update-path":
        return { ...state, path: action.payload };
      case "set-alert":
        return { ...state, alert: action.payload };
      default:
        console.error("Action type provided is not defined!");
        return state;
    }
  };

  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { ...state, dispatch };

  return (
    <AppContext.Provider value={value}>
      <AppRouter />
    </AppContext.Provider>
  );
}
