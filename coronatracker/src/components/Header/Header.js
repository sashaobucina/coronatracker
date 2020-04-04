import React from "react";
import { AppBar, ButtonGroup, IconButton, Grid, Toolbar, Typography, Tooltip } from "@material-ui/core";
import { Search, InfoOutlined, TrendingUp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root : {
    background: '#3C3F58',
    color: '#3BBA9C',
  }
});

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="sticky">
      <Toolbar>
        <Grid container direction="row" alignItems="baseline">
          <Grid item xs={7} sm={6} md={6} lg={6}>
            <Typography variant="h6" align="left" className={classes.title}>
              COVID-19 Tracker
            </Typography>
          </Grid>
        </Grid>
        <Grid item sm={4} md={4} lg={4} />
        <Grid item xs={5} sm={2} md={2} lg={2}>
          <ButtonGroup color="inherit">
            <Tooltip title="Search" placement="bottom">
              <IconButton>
                <Search />
              </IconButton>
            </Tooltip>
            <Tooltip title="Graphs" placement="bottom">
              <IconButton>
                <TrendingUp />
              </IconButton>
            </Tooltip>
            <Tooltip title="FAQs" placement="bottom">
              <IconButton>
                <InfoOutlined />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}