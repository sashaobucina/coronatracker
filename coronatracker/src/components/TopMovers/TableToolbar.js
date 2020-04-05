import React from "react";
import { Toolbar, Typography } from "@material-ui/core";
import { TrendingDown, TrendingUp } from "@material-ui/icons";

export default function TableToolbar(props) {
  const { title, report, up } = props;
  return (
    <Toolbar>
      <Typography color="inherit" align="left" variant="h5" style={{ marginRight: 5 }}>
        {title + " (# of " + report + ")"}
      </Typography>
      {up ? <TrendingUp /> : <TrendingDown />}
    </Toolbar>
  );
}