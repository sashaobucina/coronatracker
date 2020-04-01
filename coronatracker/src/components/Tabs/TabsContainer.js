import React from "react";
import { AppBar, ButtonGroup, Grid, IconButton, Tabs, Tooltip} from "@material-ui/core";
import { ArrowBack, ArrowForward, Close, ClearAll } from "@material-ui/icons";

function ScrollableTabs(props) {
  const { tabs, tabIndex } = props;

  return (
    <AppBar position="static" color="inherit" style={{ backgroundColor: "#3C3F58" }}>
      <Tabs
        value={tabIndex}
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {[...tabs]}
      </Tabs>
    </AppBar>
  )
};

export default function TabsContainer(props) {
  const { clearState, handleTabChange, tabs, tabIndex, removeTab } = props;

  return (
    <Grid container direction="row" alignItems="center" style={{ marginTop: 50 }}>
      <Grid item xs={1} sm={1} md={1} lg={1} />
      <Grid item xs={8} sm={8} md={8} lg={8}>
        <ScrollableTabs tabs={tabs} tabIndex={tabIndex} />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2}>
        <ButtonGroup color="inherit">
        <Tooltip title="Previous tab" placement="top">
            <IconButton onClick={() => handleTabChange(Math.max(0, tabIndex - 1))}>
              <ArrowBack />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next tab" placement="top">
            <IconButton onClick={() => handleTabChange(Math.min(tabIndex + 1, tabs.length - 1))}>
              <ArrowForward />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close tab" placement="top">
            <IconButton onClick={(e) => removeTab(e, tabIndex)}>
              <Close />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear all" placement="top">
            <IconButton onClick={() => clearState("")}>
              <ClearAll />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}