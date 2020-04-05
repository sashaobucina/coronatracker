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
  },
  button: {
    background: "#3C3F58",
    color: "#212121",
    "&:hover": {
      background: "#3C3F58",
      color: "#3BBA9C",
      fontWeight: "bolder",
      opacity: 0.8,
    },
    "&.Mui-selected": {
      background: '#3C3F58',
      color: "#3BBA9C",
      fontWeight: "bold",
      "&:hover": {
        background: "#3C3F58",
        opacity: 1,
      },
    }
  }
});

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
        exclusive
        size="small"
        value={scale}
        onChange={handleChange}
      >
        <ToggleButton className={classes.button} value="log">
          Log
        </ToggleButton>
        <ToggleButton className={classes.button} value="linear">
          Linear
        </ToggleButton>
      </ToggleButtonGroup>
    </Tooltip>
  )
}