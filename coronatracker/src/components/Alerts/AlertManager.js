import React from "react";
import ErrorAlert from "./ErrorAlert"
import SuccessAlert from "./SuccessAlert";
import { strings } from "../../helpers/strings";

export default function AlertManager(props) {
  const { fetchState, setFetchState, validated, updateValidation } = props;
  const { errAlert, successAlert } = fetchState["alerts"];

  const handleFetchState = () => {
    setFetchState({
      ...fetchState,
      alerts: { errAlert: false, successAlert: false },
    })
  }

  return (
    <>
      <ErrorAlert open={errAlert} message={strings.noFetch} handleClose={handleFetchState} />
      <ErrorAlert open={!validated} message={strings.invalid} handleClose={() => updateValidation(false)} />
      <SuccessAlert open={successAlert} message={strings.success} handleClose={handleFetchState} />
    </>
  );
}