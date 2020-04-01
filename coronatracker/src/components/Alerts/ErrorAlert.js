import React, { Component } from "react";
import { Snackbar} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { strings } from "../../helpers/strings";

class ErrorAlert extends Component {
  render() {
    const { open, message, handleClose } = this.props;
    const onClose = message === strings.fetch ? () => {} : handleClose;
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{  horizontal: "left", vertical: "bottom"}}>
        <Alert severity="error" variant="filled" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    )
  }
}

export default ErrorAlert;