import React from "react";
import { Link } from "react-router-dom";
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
    <AppBar className={classes.root} position="relative">
      <Toolbar>
        <Grid container direction="row" alignItems="baseline">
          <Grid item xs={7} sm={6} md={6} lg={6}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <Typography variant="h6" align="left">
                COVID-19 Tracker
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid item sm={4} md={4} lg={4} />
        <Grid item xs={5} sm={2} md={2} lg={2}>
          <ButtonGroup color="inherit">
            <Tooltip title="Search" placement="bottom">
              <Link to="/">
                <IconButton className={classes.root}>
                  <Search />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Graphs" placement="bottom">
              <Link to="/">
                <IconButton className={classes.root}>
                  <TrendingUp />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="FAQs" placement="bottom">
              <Link to="/faqs">
                <IconButton className={classes.root}>
                  <InfoOutlined />
                </IconButton>
              </Link>
            </Tooltip>
          </ButtonGroup>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}