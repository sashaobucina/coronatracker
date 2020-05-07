import React from "react";
import AppAlert from "./AppAlert"
import ReportIssueButton from "../Buttons/ReportIssueButton";
import { 
  alertStrings,
  COUNTRY_ALERT,
  NO_ALERT,
  SUCCESS_ALERT,
  SERVER_ALERT,
  DUPLICATE_ALERT
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
  const info = alertStrings[DUPLICATE_ALERT];

  return (
    <>
      <AppAlert
        action={<ReportIssueButton />}
        open={alert === SERVER_ALERT}
        message={server_err}
        handleClose={() => {}}
        severity="error"
      />
      <AppAlert
        action={null}
        open={alert === COUNTRY_ALERT}
        message={country_err}
        handleClose={resetAlert}
        severity="error"
      />
      <AppAlert
        action={null}
        open={alert === SUCCESS_ALERT}
        message={success}
        handleClose={resetAlert}
        severity="success"
      />
      <AppAlert
        action={null}
        open={alert === DUPLICATE_ALERT}
        message={info}
        handleClose={resetAlert}
        severity="info"
      />
    </>
  );
}