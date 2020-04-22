import React from "react";
import { Snackbar} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ReportIssueButton from "../Buttons/ReportIssueButton";

export default function ErrorAlert(props) {
  const { open, message, handleClose } = props;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{  horizontal: "left", vertical: "bottom"}}>
      <Alert
        action={<ReportIssueButton />}
        severity="error"
        variant="filled"
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}