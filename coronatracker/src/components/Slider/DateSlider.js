import React from "react";
import { Slider } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  color: {
    color: '#3BBA9C'
  },
  slider: {
    height: 5,
  }
});

export default function DateSlider(props) {
  const { dates, updateState, value } = props;
  const classes = useStyles();

  const valueToDate = (value) => {
    return dates[value];
  };

  return (
    <Slider
      classes={{
        colorPrimary: classes.color,
        colorSecondary: classes.color,
        rail: classes.slider,
        track: classes.slider
      }}
      defaultValue={0}
      valueLabelFormat={valueToDate}
      aria-labelledby="discrete-slider"
      marks
      step={1}
      min={0}
      max={dates.length - 1}
      valueLabelDisplay="on"
      value={value}
      onChange={(_, value) => updateState(value)}
    />
  )
}