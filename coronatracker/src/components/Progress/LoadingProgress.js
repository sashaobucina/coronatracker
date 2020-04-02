import React from "react";
import { Backdrop, CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  backdrop: {
    zIndex: 99999,
    color: "#fff"
  },
  progress: {
    color: "#3BBA9C"
  },
  text: {
    color: "#3BBA9C",
    fontSize: "1.25rem",
    marginRight: 20,
  }
});

export default function LoadingProgress(props) {
  const { open } = props;
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Typography className={classes.text} variant="overline">Fetching data...</Typography>
      <CircularProgress className={classes.progress} size={60} thickness={3} />
    </Backdrop>
  );
}