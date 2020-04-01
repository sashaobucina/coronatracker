import React from "react";
import { AppBar, Tabs } from "@material-ui/core";

export default function ScrollableTabs(props) {
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