import React, { Component } from "react";
import { Snackbar} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

class ErrorAlert extends Component {
  render() {
    const { open, message, handleClose } = this.props;
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{  horizontal: "left", vertical: "bottom"}}>
        <Alert severity="error" variant="filled" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    )
  }
}

export default ErrorAlert;