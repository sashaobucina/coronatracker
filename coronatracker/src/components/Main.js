import React from "react";
import Header from "./Header/Header";
import LoadingProgress from "./Progress/LoadingProgress"

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