import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles"

import ReportIssueButton from "../Buttons/ReportIssueButton";

const useStyles = makeStyles({
  root: {
    marginTop: 50
  }
});

export default function NotLoaded() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} direction="column" alignItems="center" spacing={5}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography align="center" variant="h4" color="inherit">
          Unable to load data... please check in later!
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <ReportIssueButton />
      </Grid>
    </Grid>
  );
}