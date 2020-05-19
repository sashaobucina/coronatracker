import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FAQs from "./FAQs";

const useStyle = makeStyles({
  paper: {
    backgroundColor: "#2E3047",
    color: "#3BBA9C",
    padding: 10,
  },
  title: {
    fontSize: "1.75rem",
  },
});

export default function FAQsDialog({ open, onClose }) {
  const classes = useStyle();
  const isXs = !useMediaQuery("(min-width:600px)");

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      maxWidth="lg"
      fullScreen={isXs}
      open={open}
      onClose={onClose}
    >
      <DialogTitle className={classes.title} disableTypography>
        FAQs
      </DialogTitle>
      <DialogContent>
        <FAQs />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" size="large">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
