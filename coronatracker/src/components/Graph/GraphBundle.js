import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import DateSlider from "../Slider/DateSlider"
import GraphDerivative from "./GraphDerivative"
import GraphOverall from "./GraphOverall";
import GraphTrajectory from "./GraphTrajectory";
import ScaleButtonGroup from "../Buttons/ScaleButtonGroup";
import SliderButtonGroup from "../Buttons/SliderButtonGroup";
import SpeedButtonGroup from "../Buttons/SpeedButtonGroup";
import { convertDataToWeekly, convertToDates, getSummary, getDate } from "../../helpers/conversions";

const useStyles = makeStyles({
  root: {
    color: "#fcba03"
  }
})

export default function GraphBundle(props) {
  const [ speed, setSpeed ] = useState(1);
  const { country, data, indexValue, scale, onStepClick, updateIndexState, updateScale } = props;
  const classes = useStyles();

  // collect data in proper format
  const { overall, first_derivative_data, second_derivative_data } = data;
  const weeklyData = convertDataToWeekly(overall);
  const dates = convertToDates(overall, weeklyData.length);
  const maxIndex = dates.length - 1;

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: 50, marginBottom: 20 }}>
        <Grid item xs={1} sm={1} md={1} lg={1} />
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Typography color="inherit" variant="h5" align="center">
            Daily Report for {country} - {getDate(overall, overall.length - 1)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center" style={{ marginBottom: 50 }}>
        <Grid item xs={3} sm={3} md={3} lg={3} />
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Typography className={classes.root} variant="h5" align="center">
            +{getSummary(overall, "confirmed")} Cases
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3}>
          <Typography variant="h5" color="error" align="center">
            +{getSummary(overall, "deaths")} Deaths
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} />
      </Grid>
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
      <Grid item xs={11} sm={11} md={11} lg={11} style={{ margin: 20 }}>
        <Typography align="center" style={{ textTransform: "capitalize" }} variant="h5">COVID-19 Trajectory ({scale})</Typography>
        <ScaleButtonGroup scale={scale} updateScale={updateScale} />
        <GraphTrajectory data={weeklyData.slice(0, indexValue)} scale={scale} />
        <Typography align="center" fontStyle="oblique"style={{ marginTop: 20 }} variant="body2">← Tune slider to view changes over time →</Typography>
        <DateSlider dates={dates} updateState={updateIndexState} value={indexValue} />
        <Grid container direction="column">
          <Grid item> 
            <SliderButtonGroup
              indexValue={indexValue}
              maxIndex={maxIndex}
              speed={speed}
              onStepClick={onStepClick}
              updateIndexState={updateIndexState}
            />
          </Grid>
          <Grid item>
            <SpeedButtonGroup speed={speed} setSpeed={setSpeed} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}