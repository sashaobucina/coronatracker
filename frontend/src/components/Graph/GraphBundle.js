import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import DateSlider from "../Slider/DateSlider"
import GraphDerivative from "./GraphDerivative"
import GraphOverall from "./GraphOverall";
import GraphTrajectory from "./GraphTrajectory";
import ScaleButtonGroup from "../Buttons/ScaleButtonGroup";
import SliderButtonGroup from "../Buttons/SliderButtonGroup";
import { convertDataToWeekly, convertToDates } from "../../helpers/conversions";

class GraphBundle extends Component {
  render() {
    const { country, data, indexValue, scale, onStepClick, updateIndexState, updateScale } = this.props;
    const { overall, first_derivative_data, second_derivative_data } = data;

    // collect data in proper format
    const weeklyData = convertDataToWeekly(overall);
    const dates = convertToDates(overall, weeklyData.length);
    const maxIndex = dates.length - 1;

    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={12}>
          <Typography align="center" variant="h4">COVID-19 Cases ({country})</Typography>
        </Grid>
        <Grid item xs={10} sm={10}>
          <GraphOverall data={overall} />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} >
          <Typography align="center" variant="h5">Rate of Change in Cases</Typography>
          <GraphDerivative data={first_derivative_data} dataKey={"first_derivative"} />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5} >
          <Typography align="center" variant="h5">Acceleration of Change</Typography>
          <GraphDerivative data={second_derivative_data} dataKey={"second_derivative"} />
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} style={{ margin: 20 }}>
          <Typography align="center" style={{ textTransform: "capitalize" }} variant="h5">COVID-19 Trajectory ({scale})</Typography>
          <ScaleButtonGroup scale={scale} updateScale={updateScale} />
          <GraphTrajectory data={weeklyData.slice(0, indexValue)} scale={scale} />
          <Typography align="center" fontStyle="oblique"style={{ marginTop: 20 }} variant="body2">← Tune slider to view changes over time →</Typography>
          <DateSlider dates={dates} updateState={updateIndexState} value={indexValue} />
          <SliderButtonGroup
            indexValue={indexValue}
            maxIndex={maxIndex}
            onStepClick={onStepClick}
            updateIndexState={updateIndexState} />
        </Grid>
      </Grid>
    )
  }
}

export default GraphBundle;