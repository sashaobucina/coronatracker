import React from "react";
import Header from "./Header/Header";
import AlertManager from "./Alerts/AlertManager";
import LoadingProgress from "./Progress/LoadingProgress"

import '../style/main.css';

export default function Main(props) {
  const { children, alert, loaded, path, setAlert, updatePath } = props;
  return (
    <>
      <AlertManager alert={alert} setAlert={setAlert} />
      <Header path={path} updatePath={updatePath} />
      <LoadingProgress open={!loaded} />
      { children }
    </>
  );
}