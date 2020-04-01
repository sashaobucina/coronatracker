import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
  root: {
    background: '#3C3F58',
    color: '#3BBA9C'
  },
  toggleRoot: {
    background: '#3C3F58',
    color: '#3BBA9C'
  }
});

export default function SpeedButtonGroup(props) {
  const { speed, setSpeed } = props;
  const classes = useStyles();

  const handleChange = (_, newSpeed) => {
    if (newSpeed) {
      setSpeed(newSpeed);
    }
  };

  return (
    <ToggleButtonGroup
      className={classes.root}
      value={speed}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton className={classes.toggleRoot} value={0.25}>
        0.25x
      </ToggleButton>
      <ToggleButton className={classes.toggleRoot} value={0.5}>
        0.5x
      </ToggleButton>
      <ToggleButton className={classes.toggleRoot} value={1}>
        1x
      </ToggleButton>
      <ToggleButton className={classes.toggleRoot} value={2}>
        2x
      </ToggleButton>
    </ToggleButtonGroup>
  )
}