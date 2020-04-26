import React from "react";
import { Snackbar} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function SuccessAlert(props) {
  const { action, open, message, handleClose, severity } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={handleClose}
    >
      <Alert
        action={action}
        severity={severity}
        variant="filled"
        onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}