import React from "react";
import { Backdrop, CircularProgress, Grid, Typography } from "@material-ui/core";
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
    fontSize: "1.25rem"
  },
  subText: {
    color: "#3BBA9C",
    fontSize: "0.65rem"
  }
});

export default function LoadingProgress(props) {
  const { open } = props;
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Typography className={classes.text} variant="overline">Initializing data...</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.subText} variant="overline">(May take up to 20 secs)</Typography>
        </Grid>
        <Grid item>
          <CircularProgress className={classes.progress} size={60} thickness={3} />
        </Grid>
      </Grid>
    </Backdrop>
  );
}