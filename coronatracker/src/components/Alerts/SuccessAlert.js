import React from "react";
import { Snackbar} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function SuccessAlert(props) {
  const { open, message, handleClose } = props;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{  horizontal: "left", vertical: "bottom"}}>
      <Alert severity="success" variant="filled" onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}