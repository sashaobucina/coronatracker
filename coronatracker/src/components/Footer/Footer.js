import React from "react";
import { Link, Grid, Typography, Tooltip } from "@material-ui/core";

export default function Footer() {
  return (
    <Grid container direction="row" justify="center" alignItems="center" style={{ margin: 30 }}>
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Typography align="center" variant="body1">
          Big thanks to the <Tooltip title="Go to source data"><Link href="https://github.com/CSSEGISandData/COVID-19" color="primary" variant="body1">John Hopkins CSSE</Link></Tooltip> for the data!
          Report any issues <Tooltip title="Report an issue"><Link href="https://github.com/sashaobucina/coronatracker/issues">here</Link></Tooltip>.
        </Typography>
      </Grid>
    </Grid>
  );
}