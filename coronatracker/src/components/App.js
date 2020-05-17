import React, { useReducer } from "react";
import AppRouter from "./AppRouter";

export const AppContext = React.createContext({});

export default function AppProvider() {
  let initialState = { topMovers: null, peak: null, heatmap: [] };

  let reducer = (state, action) => {
    switch (action.type) {
      case "update-heatmap":
        return { ...state, heatmap: action.payload };
      case "update-peak":
        return { ...state, peak: action.payload };
      case "update-top-movers":
        return { ...state, topMovers: action.payload };
      default:
        console.error("Action type provided is not defined!");
        return state;
    }
  };

  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>
      <AppRouter />
    </AppContext.Provider>
  );
}
