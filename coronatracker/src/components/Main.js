import React from "react";
import Header from "./Header/Header";
import AlertManager from "./Alerts/AlertManager";
import LoadingProgress from "./Progress/LoadingProgress";

import "../style/main.css";

export default function Main(props) {
  const { children, loaded } = props;
  return (
    <React.Fragment>
      <AlertManager />
      <Header />
      <LoadingProgress open={!loaded} />
      {children}
    </React.Fragment>
  );
}
