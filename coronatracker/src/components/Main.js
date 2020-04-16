import React from "react";
import Header from "./Header/Header";
import LoadingProgress from "./Progress/LoadingProgress"

import '../style/main.css';

export default function Main(props) {
  const { children, loaded } = props;
  return (
    <>
      <Header />
      <LoadingProgress open={!loaded} />
      { children }
    </>
  );
}