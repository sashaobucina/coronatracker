import React from "react";
import MyAlert from "./MyAlert"
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
  const warning = alertStrings[DUPLICATE_ALERT];

  return (
    <>
      <MyAlert
        action={<ReportIssueButton />}
        open={alert === SERVER_ALERT}
        message={server_err}
        handleClose={() => {}}
        severity="error"
      />
      <MyAlert
        action={<ReportIssueButton />}
        open={alert === COUNTRY_ALERT}
        message={country_err}
        handleClose={resetAlert}
        severity="error"
      />
      <MyAlert
        action={null}
        open={alert === SUCCESS_ALERT}
        message={success}
        handleClose={resetAlert}
        severity="success"
      />
      <MyAlert
        action={null}
        open={alert === DUPLICATE_ALERT}
        message={warning}
        handleClose={resetAlert}
        severity="warning"
      />
    </>
  );
}