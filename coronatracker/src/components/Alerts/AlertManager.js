import React from "react";
import ErrorAlert from "./ErrorAlert"
import SuccessAlert from "./SuccessAlert";

export default function AlertManager(props) {
  const { fetched, validated, updateFetched, updateValidation } = props;

  return (
    <>
      <ErrorAlert open={validated !== ""} message={validated} handleClose={() => updateValidation("")} />
      <SuccessAlert open={fetched !== ""} message={fetched} handleClose={() => updateFetched("")} />
    </>
  );
}