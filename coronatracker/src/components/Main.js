import React from "react";
import Header from "./Header/Header";
import LoadingProgress from "./Progress/LoadingProgress"

import '../style/main.css';

export default function Main(props) {
  const { children, loaded, path, updatePath } = props;
  return (
    <>
      <Header path={path} updatePath={updatePath} />
      <LoadingProgress open={!loaded} />
      { children }
    </>
  );
}