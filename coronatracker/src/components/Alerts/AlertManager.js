import React from "react";
import ErrorAlert from "./ErrorAlert"
import SuccessAlert from "./SuccessAlert";
import { 
  alertStrings,
  COUNTRY_ALERT,
  NO_ALERT,
  SUCCESS_ALERT,
  SERVER_ALERT
} from "../../helpers/alerts";

export default function AlertManager(props) {
  const { alert, setAlert } = props;

  const resetAlert = () => {
    setAlert(NO_ALERT);
  }

  // accumulate the strings
  const success = alertStrings[SUCCESS_ALERT];
  const server_err = alertStrings[SERVER_ALERT];
  const country_err = alertStrings[COUNTRY_ALERT];

  return (
    <>
      <ErrorAlert open={alert === SERVER_ALERT} message={server_err} handleClose={() => {}} />
      <ErrorAlert open={alert === COUNTRY_ALERT} message={country_err} handleClose={resetAlert} />
      <SuccessAlert open={alert === SUCCESS_ALERT} message={success} handleClose={resetAlert} />
    </>
  );
}