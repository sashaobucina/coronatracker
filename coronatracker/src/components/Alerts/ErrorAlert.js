import React from "react";
import { Snackbar} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { strings } from "../../helpers/strings";

export default function ErrorAlert(props) {
  const { open, message, handleClose } = props;
  const onClose = message === strings.fetch ? () => {} : handleClose;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{  horizontal: "left", vertical: "bottom"}}>
      <Alert severity="error" variant="filled" onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}