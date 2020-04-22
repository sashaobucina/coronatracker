import React from "react";
import { AppBar, ButtonGroup, Grid, IconButton, Tabs, Tooltip, Typography} from "@material-ui/core";
import { ArrowBack, ArrowForward, Close, ClearAll } from "@material-ui/icons";
import { makeStyles } from '@material-ui/styles';
import CountryTab from './CountryTab';

const useStyles = makeStyles({
  indicator: {
    background: "#3BBA9C"
  }
});

function ScrollableTabs(props) {
  const { tabs, tabIndex } = props;
  const classes = useStyles();

  return (
    <AppBar position="static" color="inherit" style={{ backgroundColor: "#3C3F58" }}>
      <Tabs
        classes={{ indicator: classes.indicator }}
        indicatorColor="primary"
        scrollButtons="auto"
        variant="scrollable"
        value={tabIndex}
      >
        {[...tabs]}
      </Tabs>
    </AppBar>
  )
};

export default function TabsContainer(props) {
  const { countries, clearState, handleTabChange, tabIndex, removeTab } = props;

  const tabs = countries.map((country, i) => (
    <CountryTab
      country={country}
      key={i}
      index={i}
      handleClose={removeTab}
      handleChange={handleTabChange}
    />
  ));

  return (
    <Grid container direction="row" alignItems="center" style={{ marginTop: 20, marginLeft: 5, marginRight: 5 }} spacing={1}>
      <Grid container direction="row" justify="flex-start">
        <Grid item sm={1} md={1} lg={1} />
        <Grid item xs={4} sm={2} md={2} lg={2}>
          <Typography variant="subtitle1">Country Tabs</Typography>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item xs={1} sm={1} md={1} lg={1} />
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <ScrollableTabs tabs={tabs} tabIndex={tabIndex} />
        </Grid>
        <Grid item xs={4} sm={2} md={2} lg={2}>
          <ButtonGroup color="inherit">
          <Tooltip title="Previous tab" placement="top">
              <IconButton onClick={() => handleTabChange(Math.max(0, tabIndex - 1))}>
                <ArrowBack />
              </IconButton>
            </Tooltip>
            <Tooltip title="Next tab" placement="top">
              <IconButton onClick={() => handleTabChange(Math.min(tabIndex + 1, countries.length - 1))}>
                <ArrowForward />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close tab" placement="top">
              <IconButton onClick={(e) => removeTab(e, tabIndex)}>
                <Close />
              </IconButton>
            </Tooltip>
            <Tooltip title="Clear all" placement="top">
              <IconButton onClick={() => clearState(true)}>
                <ClearAll />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  )
}