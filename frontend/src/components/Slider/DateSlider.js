import React, { Component } from "react";
import { Slider } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';

const styles = {
  color: {
    color: '#3BBA9C'
  },
  slider: {
    height: 5,
  }
}

class DateSlider extends Component {
  constructor(props) {
    super(props);

    this.valueToDate = this.valueToDate.bind(this);
  }

  valueToDate = (value) => {
    return this.props.dates[value];
  }

  render() {
    const { classes, dates, updateState, value } = this.props;
    return (
      <Slider
        classes={{
          colorPrimary: classes.color,
          colorSecondary: classes.color,
          rail: classes.slider,
          track: classes.slider
        }}
        defaultValue={0}
        valueLabelFormat={this.valueToDate}
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
}

export default withStyles(styles)(DateSlider);