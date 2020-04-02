import React from "react";
import { Tooltip } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    background: '#3C3F58',
    color: '#3BBA9C',
    "&:hover": {
      background: '#3C3F58',
    }
  }
})

export default function ScaleButtonGroup(props) {
  const { scale, updateScale } = props;
  const classes = useStyles();

  const handleChange = (_, newScale) => {
    if (newScale) {
      updateScale(newScale)
    }
  }

  return (
    <Tooltip title="Modify scale" placement="top">
      <ToggleButtonGroup
        className={classes.root}
        value={scale}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton className={classes.root} value="log">
          Log
        </ToggleButton>
        <ToggleButton className={classes.root} value="linear">
          Linear
        </ToggleButton>
      </ToggleButtonGroup>
    </Tooltip>
  )
}