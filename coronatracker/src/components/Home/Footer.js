import React from "react";
import { Link, Grid, Typography, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  grid: {
    marginTop: 10,
    marginBottom: 25
  }
})

export default function Footer() {
  const classes = useStyle();

  return (
    <Grid container className={classes.grid} justify="center">
      <Grid item xs={1} />
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Typography align="center" variant="body1">
          Big thanks to the <Tooltip title="Go to source data"><Link href="https://github.com/CSSEGISandData/COVID-19" color="primary" variant="body1">John Hopkins CSSE</Link></Tooltip> for the data!
          Report any issues <Tooltip title="Report an issue"><Link href="https://github.com/sashaobucina/coronatracker/issues">here</Link></Tooltip>.
        </Typography>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography align="center" style={{ fontSize: 12 }}>
          (Updated daily)
        </Typography>
      </Grid>
    </Grid>
  );
}