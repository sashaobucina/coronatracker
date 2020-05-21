import React from "react";
import { Link, Grid, Typography, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import BuyMeACoffeeButton from "../Buttons/BuyMeACoffeeButton";

const useStyle = makeStyles({
  grid: {
    marginTop: 15,
    marginBottom: 25,
  },
  text: {
    fontSize: "12px",
    textAlign: "center",
  },
});

export default function Footer() {
  const classes = useStyle();

  return (
    <Grid
      container
      className={classes.grid}
      direction="column"
      alignContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={10} sm={12} md={12} lg={12}>
        <Typography align="center" variant="body1">
          Big thanks to the{" "}
          <Tooltip title="Go to source data">
            <Link
              href="https://github.com/CSSEGISandData/COVID-19"
              color="primary"
              variant="body1"
            >
              John Hopkins CSSE
            </Link>
          </Tooltip>{" "}
          for the data! Report any issues{" "}
          <Tooltip title="Report an issue">
            <Link href="https://github.com/sashaobucina/coronatracker/issues">
              here
            </Link>
          </Tooltip>
        </Typography>
        <Typography className={classes.text}>(Updated daily)</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <BuyMeACoffeeButton />
      </Grid>
    </Grid>
  );
}
